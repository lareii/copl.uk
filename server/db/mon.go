package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	db     *mongo.Database
	Client *mongo.Client
)

func Setup() {
	uri := os.Getenv("MONGO_URI")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Error connecting to MongoDB: ", err)
	}

	db = Client.Database(os.Getenv("MONGO_DB"))
	if err := createDatabase(ctx, os.Getenv("MONGO_DB")); err != nil {
		log.Fatal("Error creating database: ", err)
	}
	initCollections(db)
}

func Disconnect() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := Client.Disconnect(ctx); err != nil {
		log.Fatal("Error disconnecting from MongoDB: ", err)
	}

	log.Println("Connection to MongoDB closed.")
}
