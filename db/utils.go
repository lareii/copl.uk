package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	Users *mongo.Collection
	Posts *mongo.Collection
)

func createDatabase(ctx context.Context, dbName string) error {
	dbNames, err := Client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		return err
	}

	for _, name := range dbNames {
		if name == dbName {
			log.Println("Database already exists.")
			return nil
		}
	}

	if err := Client.Database(dbName).CreateCollection(ctx, "users"); err != nil {
		return err
	}

	if err := Client.Database(dbName).CreateCollection(ctx, "posts"); err != nil {
		return err
	}

	return nil
}

func initCollections(db *mongo.Database) {
	Users = db.Collection("users")
	Posts = db.Collection("posts")
}
