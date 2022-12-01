package db

import (
	"context"
	"fmt"
	"time"

	"github.com/adamdevigili/thundy/api/models"
	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func InitMongoClient(config *models.Config) (*mongo.Client, error) {
	clientOptions := options.Client().ApplyURI(fmt.Sprintf(
		"mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority",
		config.MONGO_USER,
		config.MONGO_PASSWORD,
		config.MONGO_CLUSTER_PATH,
		config.MONGO_DB_NAME,
	))

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	mongoClient, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Err(err).Msg("could not connect to database")
		return nil, err
	}

	if err = mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal().Err(err).Msg("could not ping database")
	}

	log.Info().Msg("successfully connected to database")

	return mongoClient, nil
}
