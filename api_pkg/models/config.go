package models

import "net/http"

func Pass(w http.ResponseWriter, r *http.Request) {}

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
