package config

import (
	"fmt"
	"net/http"

	"github.com/adamdevigili/thundy/api_pkg/models"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog/log"
)

// Configuration to be filled by envconfig
type Config struct {
	// JSONBIN_BIN_ID  string
	// JSONBIN_API_KEY string

	MONGODB_URI string

	MONGO_USER         string
	MONGO_PASSWORD     string
	MONGO_CLUSTER_PATH string
	MONGO_DB_NAME      string

	THUNDY_API_KEY string

	VERCEL_ENV string
}

func InitHandler(w http.ResponseWriter, r *http.Request) (*Config, error) {
	w.Header().Set("Content-Type", "application/json")

	config, err := process()
	if err != nil {
		log.Err(err).Msg("could not process environment variables")
		return nil, err
	}

	err = authorize(r, *config)
	if err != nil {
		log.Error().Err(err).Msg("failed to authorize request")
		w.WriteHeader(http.StatusUnauthorized)
		return nil, err
	}

	return config, nil
}

func process() (*Config, error) {
	var config Config
	err := envconfig.Process("", &config)
	if err != nil {
		return nil, err
	}

	return &config, nil
}

func authorize(r *http.Request, config Config) error {
	if config.VERCEL_ENV != "development" {
		if r.Header.Get(models.APIKeyHeader) != config.THUNDY_API_KEY {
			err := fmt.Errorf("incoming request API key invalid: %s", r.Header.Get(models.APIKeyHeader))

			return err
		}
	} else {
		log.Info().Msgf("%+v\n", config)
	}

	return nil
}
