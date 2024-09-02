package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	UsersCollectionName    = "users"
	PostsCollectionName    = "posts"
	CommentsCollectionName = "comments"
)

var (
	Users    *mongo.Collection
	Posts    *mongo.Collection
	Comments *mongo.Collection
)

func createDatabase(ctx context.Context, databaseName string) error {
	databaseNames, err := Client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		return err
	}

	for _, name := range databaseNames {
		if name == databaseName {
			log.Println("Database", databaseName, "already exists.")
			return nil
		}
	}

	collections := []string{UsersCollectionName, PostsCollectionName, CommentsCollectionName}
	for _, coll := range collections {
		if err := Client.Database(databaseName).CreateCollection(ctx, coll); err != nil {
			return err
		}
		log.Println("Created collection:", coll)
	}

	return nil
}

func initCollections(database *mongo.Database) {
	Users = database.Collection(UsersCollectionName)
	Posts = database.Collection(PostsCollectionName)
	Comments = database.Collection(CommentsCollectionName)
}
