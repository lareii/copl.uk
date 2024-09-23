package database

import "go.mongodb.org/mongo-driver/mongo"

const (
	UsersCollectionName         = "users"
	PostsCollectionName         = "posts"
	CommentsCollectionName      = "comments"
	NofiticationsCollectionName = "notifications"
)

var (
	Users         *mongo.Collection
	Posts         *mongo.Collection
	Comments      *mongo.Collection
	Notifications *mongo.Collection
)

func initCollections(database *mongo.Database) {
	Users = database.Collection(UsersCollectionName)
	Posts = database.Collection(PostsCollectionName)
	Comments = database.Collection(CommentsCollectionName)
	Notifications = database.Collection(NofiticationsCollectionName)
}
