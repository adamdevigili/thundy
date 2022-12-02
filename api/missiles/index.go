package missiles

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/adamdevigili/thundy/api_pkg/db"
	"github.com/adamdevigili/thundy/api_pkg/models"
	"github.com/kelseyhightower/envconfig"
	cmap "github.com/orcaman/concurrent-map/v2"
	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MissileHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		if len(r.URL.Query()[models.NameQueryKey]) > 0 {
			GetMissile(w, r)
		} else {
			GetMissiles(w, r)
		}
	} else if r.Method == http.MethodPut {
		UpdateMissiles(w, r)
	}
}

func GetMissiles(w http.ResponseWriter, r *http.Request) {
	log.Info().Fields(r).Msg("GetMissiles called")

	ctx := context.Background()

	w.Header().Set("Content-Type", "application/json")

	var config models.Config
	err := envconfig.Process("", &config)
	if err != nil {
		log.Err(err).Msg("could not process environment variables")
		return
	}

	if config.VERCEL_ENV != "development" {
		if r.Header.Get(models.APIKeyHeader) != config.THUNDY_API_KEY {
			log.Error().Msgf("incoming request API key invalid: %s", r.Header.Get(models.APIKeyHeader))
			fmt.Fprint(w, "not authorized")
			w.WriteHeader(http.StatusUnauthorized)

			return
		}
	} else {
		log.Info().Msgf("%+v\n", config)
	}

	mongoClient, err := db.InitMongoClient(&config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}

	defer mongoClient.Disconnect(ctx)

	coll := mongoClient.Database("thundy").Collection("missiles")

	// filter := bson.D{}
	cursor, err := coll.Find(context.TODO(), bson.D{{}}, options.Find())
	if err != nil {
		log.Err(err).Msg("failed to find documents in collection")
		return
	}
	var results models.Missiles
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

func GetMissile(w http.ResponseWriter, r *http.Request) {
	log.Info().Msg("GetMissile called")

	ctx := context.Background()

	w.Header().Set("Content-Type", "application/json")

	var config models.Config
	err := envconfig.Process("", &config)
	if err != nil {
		log.Err(err).Msg("could not process environment variables")
		return
	}

	if config.VERCEL_ENV != "development" {
		if r.Header.Get(models.APIKeyHeader) != config.THUNDY_API_KEY {
			log.Error().Msgf("incoming request API key invalid: %s", r.Header.Get(models.APIKeyHeader))
			fmt.Fprint(w, "not authorized")
			w.WriteHeader(http.StatusUnauthorized)

			return
		}
	} else {
		log.Info().Msgf("%+v\n", config)
	}

	mongoClient, err := db.InitMongoClient(&config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}
	defer mongoClient.Disconnect(ctx)

	nameQuery := r.URL.Query()[models.NameQueryKey][0]

	coll := mongoClient.Database("thundy").Collection("missiles")

	var result models.Missile
	err = coll.FindOne(context.TODO(), bson.D{{Key: "name", Value: nameQuery}}).Decode(&result)
	if err != nil {
		log.Err(err).Msg("failed to find missile")
		return
	}
	// if err != nil {
	// 	log.Err(err).Msg("failed to find documents in collection")
	// 	return
	// }
	// var results models.Missiles
	// if err = cursor.All(context.TODO(), &results); err != nil {
	// 	log.Err(err).Msg("failed to read documents in collection")
	// 	return
	// }
	// cursor.Close(ctx)

	log.Info().Msg("successfully retrieved latest data")
	w.WriteHeader(http.StatusOK)

	// Cache response in CDN for 5 minutes
	// w.Header().Set("Cache-Control", "s-maxage=300")

	json.NewEncoder(w).Encode(result)
}

func UpdateMissiles(w http.ResponseWriter, r *http.Request) {
	log.Info().Fields(r).Msg("UpdateMissiles called")

	ctx := context.Background()
	w.Header().Set("Content-Type", "application/json")

	var config models.Config
	err := envconfig.Process("", &config)
	if err != nil {
		log.Err(err).Msg("could not process environment variables")
		return
	}

	if config.VERCEL_ENV != "development" {
		if r.Header.Get(models.APIKeyHeader) != config.THUNDY_API_KEY {
			log.Error().Msgf("incoming request API key invalid: %s", r.Header.Get(models.APIKeyHeader))
			fmt.Fprint(w, "not authorized")
			w.WriteHeader(http.StatusUnauthorized)

			return
		}
	} else {
		log.Info().Msgf("%+v\n", config)
	}

	// Get list of files in missile directory
	baseRepoURL := "https://api.github.com/repos/gszabi99/War-Thunder-Datamine/contents/aces.vromfs.bin_u/gamedata"
	missilesDirPath := "/weapons/rocketguns"

	missilesDirURL := fmt.Sprintf("%s%s", baseRepoURL, missilesDirPath)
	log.Info().Str("missileFilesURL", missilesDirURL).Msg("fetching missile directory contents")

	resp, err := http.Get(missilesDirURL)
	if err != nil {
		log.Err(err).Msg("failed to fetch repo contents")
	}
	defer resp.Body.Close()

	var targets models.RepoContents
	if err := json.NewDecoder(resp.Body).Decode(&targets); err != nil {
		log.Err(err).Msg("failed to decode repo contents")
	}

	// Run initial filter over filenames to remove unwanted files
	filteredTargets := targets.FilterAAMs()

	// Concurrently fetch the remaining files
	var wg sync.WaitGroup
	missiles := cmap.New[*models.Missile]()

	for _, t := range filteredTargets {
		wg.Add(1)
		go func(url string) {
			defer wg.Done()

			// log.Info().Str("url", url).Msg("fetching data file")
			resp, err := http.Get(url)
			if err != nil {
				log.Err(err).Msg("failed to fetch data file")
				return
			}
			defer resp.Body.Close()

			var missileGithub models.MissileGithub

			// Try to unmarshal the data into a Missile. If it fails, that means we're not looking at an AAM
			if err := json.NewDecoder(resp.Body).Decode(&missileGithub); err != nil {
				log.Warn().Err(err).Str("url", url).Msg("failed to unmarshal into Missile type, probably not an AAM")
				return
			}

			if missileGithub.Rocket.GuidanceType == "" || missileGithub.MeshDesployed != "" {
				log.Warn().Err(err).Str("url", url).Msg("successfully unmarshalled, but no guidance type found, probably not an AAM")
				return
			}


			apiModel := missileGithub.ToAPIModel(url, time.Now())


			missiles.Set(apiModel.Name, apiModel)

			log.Info().Str("name", apiModel.Name).Msg("missile added")
		}(t.DownloadURL)
	}

	wg.Wait()

	// Store results in mongo collection
	mongoClient, err := db.InitMongoClient(&config)
	if err != nil {
		log.Err(err).Msg("failed to init mongo client")
		return
	}
	defer mongoClient.Disconnect(ctx)

	coll := mongoClient.Database("thundy").Collection("missiles")

	_, err = coll.DeleteMany(context.TODO(), bson.D{{}}, options.Delete())
	if err != nil {
		log.Err(err).Msg("error deleting existing missiles from MongoDB")
		return
	}

	log.Info().Msg("deleted existing missile values")

	// Need to convert to []interface{} to use mongo client
	ifs := make([]interface{}, missiles.Count())
	i := 0
	for _, v := range missiles.Items() {
		ifs[i] = v
		i += 1
	}

	// l.Info("len", zap.Int("len", len(missiles)), zap.Any("missiles", missiles))
	_, err = coll.InsertMany(context.TODO(), ifs)
	if err != nil {
		log.Err(err).Msg("error updating missiles in MongoDB")
		return
	}

	log.Info().Msg("successfully stored new missile data")

	fmt.Fprint(w, "success")
	w.WriteHeader(http.StatusOK)
}
