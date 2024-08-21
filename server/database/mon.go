package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const DatabaseName = "db"

var (
	Client   *mongo.Client
	database *mongo.Database
)

func Setup() {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		log.Fatal("MONGO_URI environment variable not set")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Error connecting to MongoDB: ", err)
	}

	database = Client.Database(DatabaseName)
	if err := createDatabase(ctx, DatabaseName); err != nil {
		log.Fatal("Error creating database: ", err)
	}

	initCollections(database)
	log.Println("MongoDB setup completed successfully")
}

func Disconnect() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := Client.Disconnect(ctx); err != nil {
		log.Fatal("Error disconnecting from MongoDB: ", err)
	}

	log.Println("Connection to MongoDB closed.")
}
