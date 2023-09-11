package main

import (
	"fmt"
	"log"
	"os"
	"user-service/controllers"
	"user-service/data"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

// We have to initialize the database before starting the server
// Otherwise, the server will not be able to connect to the database

func main() {

	//  connect to DB
	conn, err := data.OpenDB()
	if err != nil {
		log.Panic("can't connect to postgres")
	}

	// setup config
	app := controllers.Config{
		Repo: data.NewRepository(conn),
	}

	e := app.NewServer()
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", os.Getenv("PORT"))))

}
