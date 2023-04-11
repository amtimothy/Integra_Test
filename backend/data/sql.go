package data

import (
	"database/sql"
	"fmt"
	"os"
)

func OpenDB() (*sql.DB, error) {

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable connect_timeout=%s",
		os.Getenv("POSTGRES_DB_HOST"),
		os.Getenv("POSTGRES_DB_PORT"),
		os.Getenv("POSTGRES_DB_USER"),
		os.Getenv("POSTGRES_DB_PASSWORD"),
		os.Getenv("POSTGRES_DB_NAME"),
		"10",
	)

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
