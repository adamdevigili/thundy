package db

// Configuration to be filled by envconfig
type DBConfig struct {
	// JSONBIN_BIN_ID  string
	// JSONBIN_API_KEY string

	MONGO_USER         string
	MONGO_PASSWORD     string
	MONGO_CLUSTER_PATH string
	MONGO_DB_NAME      string

	THUNDY_API_KEY string

	VERCEL_ENV string
}
