package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/lareii/copl.uk/server/db"
	"github.com/lareii/copl.uk/server/routes"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file.")
	}

	db.Setup()
}

func main() {
	err := routes.StartServer()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Disconnect()
}
