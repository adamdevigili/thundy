package db

import (
	"context"
	"net/http"
	"time"

	"github.com/adamdevigili/thundy/api_pkg/config"

	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Pass(w http.ResponseWriter, r *http.Request) {}

func InitMongoClient(config *config.Config) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(config.MONGODB_URI)

	mongoClient, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Err(err).Msg("could not connect to database")
		return nil, err
	}

	log.Info().Msg("pinging database")

	if err = mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal().Err(err).Msg("could not ping database")
	}

	log.Info().Msg("successfully connected to database")

	return mongoClient, nil
}
