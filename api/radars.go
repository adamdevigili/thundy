package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/adamdevigili/thundy/api_pkg/config"
	"github.com/adamdevigili/thundy/api_pkg/db"
	"github.com/adamdevigili/thundy/api_pkg/models"
	cmap "github.com/orcaman/concurrent-map/v2"
	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func RadarHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		if len(r.URL.Query()[models.NameQueryKey]) > 0 {
			GetRadar(w, r)
		} else {
			GetRadars(w, r)
		}
	} else if r.Method == http.MethodPut {
		UpdateRadars(w, r)
	}
}

func GetRadars(w http.ResponseWriter, r *http.Request) {
	log.Info().Fields(r).Msg("GetRadars called")
	ctx := context.Background()

	config, err := config.InitHandler(w, r)
	if err != nil {
		log.Err(err).Msg("failed to init handler")
		return
	}

	mongoClient, err := db.InitMongoClient(config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}

	defer mongoClient.Disconnect(ctx)

	coll := mongoClient.Database("thundy").Collection("radars")

	// filter := bson.D{}
	cursor, err := coll.Find(context.TODO(), bson.D{{}}, options.Find())
	if err != nil {
		log.Err(err).Msg("failed to find documents in collection")
		return
	}
	var results models.Radars
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Err(err).Msg("failed to read documents in collection")
		return
	}
	cursor.Close(ctx)

	log.Info().Msg("successfully retrieved latest data")
	w.WriteHeader(http.StatusOK)

	// Cache response in CDN for 5 minutes
	// w.Header().Set("Cache-Control", "s-maxage=300")

	json.NewEncoder(w).Encode(results)
}

func GetRadar(w http.ResponseWriter, r *http.Request) {
	log.Info().Msg("GetRadar called")
	ctx := context.Background()

	config, err := config.InitHandler(w, r)
	if err != nil {
		log.Err(err).Msg("failed to init handler")
		return
	}

	mongoClient, err := db.InitMongoClient(config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}
	defer mongoClient.Disconnect(ctx)

	nameQuery := r.URL.Query()[models.NameQueryKey][0]

	coll := mongoClient.Database("thundy").Collection("radars")

	var result models.Radar
	err = coll.FindOne(context.TODO(), bson.D{{Key: "name", Value: nameQuery}}).Decode(&result)
	if err != nil {
		log.Err(err).Msg("failed to find radar")
		return
	}

	log.Info().Msg("successfully retrieved latest data")
	w.WriteHeader(http.StatusOK)

	// Cache response in CDN for 5 minutes
	// w.Header().Set("Cache-Control", "s-maxage=300")

	json.NewEncoder(w).Encode(result)
}

func UpdateRadars(w http.ResponseWriter, r *http.Request) {
	log.Info().Fields(r).Msg("UpdateRadars called")
	ctx := context.Background()

	config, err := config.InitHandler(w, r)
	if err != nil {
		log.Err(err).Msg("failed to init handler")
		return
	}

	// Get list of files in radar directory
	baseRepoURL := "https://api.github.com/repos/gszabi99/War-Thunder-Datamine/contents/aces.vromfs.bin_u/gamedata"
	radarsDirPath := "/sensors"

	radarsDirURL := fmt.Sprintf("%s%s", baseRepoURL, radarsDirPath)
	log.Info().Str("radarFilesURL", radarsDirURL).Msg("fetching radar directory contents")

	resp, err := http.Get(radarsDirURL)
	if err != nil {
		log.Err(err).Msg("failed to fetch repo contents")
	}
	defer resp.Body.Close()

	var targets models.RepoContents
	if err := json.NewDecoder(resp.Body).Decode(&targets); err != nil {
		log.Err(err).Msg("failed to decode repo contents")
	}

	// Run initial filter over filenames to remove unwanted files
	filteredTargets := targets.FilterRadars()

	// Concurrently fetch the remaining files
	var wg sync.WaitGroup
	radars := cmap.New[*models.Radar]()

	for _, t := range filteredTargets {
		wg.Add(1)
		go func(url string) {
			defer wg.Done()

			log.Info().Str("url", url).Msg("fetching data file")
			resp, err := http.Get(url)
			if err != nil {
				log.Err(err).Msg("failed to fetch data file")
				return
			}
			defer resp.Body.Close()

			var radarGithub models.RadarGithub

			// Try to unmarshal the data into a Radar. If it fails, that means we're not looking at an aircraft radar
			if err := json.NewDecoder(resp.Body).Decode(&radarGithub); err != nil {
				log.Warn().Err(err).Str("url", url).Msg("failed to unmarshal into Radar type, probably not an aircraft radar")
				return
			}

			// if radarGithub.Rocket.GuidanceType == "" || radarGithub.MeshDesployed != "" {
			// 	log.Warn().Err(err).Str("url", url).Msg("successfully unmarshalled, but no guidance type found, probably not an AAM")
			// 	return
			// }

			apiModel := radarGithub.ToAPIModel(url, time.Now())

			radars.Set(apiModel.Name, apiModel)

			log.Info().Str("name", apiModel.Name).Msg("radar added")
		}(t.DownloadURL)
	}

	wg.Wait()

	// Store results in mongo collection
	mongoClient, err := db.InitMongoClient(config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}
	defer mongoClient.Disconnect(ctx)

	coll := mongoClient.Database("thundy").Collection("radars")

	_, err = coll.DeleteMany(context.TODO(), bson.D{{}}, options.Delete())
	if err != nil {
		log.Err(err).Msg("error deleting existing radars from MongoDB")
		return
	}

	log.Info().Msg("deleted existing radar values")

	// Need to convert to []interface{} to use mongo client
	ifs := make([]interface{}, radars.Count())
	i := 0
	for _, v := range radars.Items() {
		ifs[i] = v
		i += 1
	}

	// l.Info("len", zap.Int("len", len(missiles)), zap.Any("missiles", missiles))
	_, err = coll.InsertMany(context.TODO(), ifs)
	if err != nil {
		log.Err(err).Msg("error updating radars in MongoDB")
		return
	}

	log.Info().Msg("successfully stored new radar data")

	fmt.Fprint(w, "success")
	w.WriteHeader(http.StatusOK)
}
