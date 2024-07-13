package models

import (
	"context"
	"fmt"
	"time"

	"github.com/lareii/copl.uk/client/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Posts struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CreatedAt time.Time           `bson:"created_at" json:"created_at"`
	AuthorID  *primitive.ObjectID `bson:"author_id" json:"author_id"`
	Title     string              `bson:"title" json:"title"`
	Content   string              `bson:"content" json:"content"`
	Likes     int                 `bson:"likes" json:"likes"`
}

func GetPostByID(postID primitive.ObjectID) (Posts, error) {
	var post Posts
	err := db.Posts.FindOne(context.Background(), bson.M{"_id": postID}).Decode(&post)
	if err != nil {
		return post, fmt.Errorf("error fetching post: %v", err)
	}

	return post, nil
}

func CreatePost(post Posts) error {
	post.ID = primitive.NewObjectID()
	post.CreatedAt = time.Now()
	post.Likes = 0

	_, err := db.Posts.InsertOne(context.Background(), post)
	if err != nil {
		return fmt.Errorf("error creating post: %v", err)
	}

	return nil
}

func DeletePost(postID primitive.ObjectID) error {
	_, err := db.Posts.DeleteOne(context.Background(), bson.M{"_id": postID})
	if err != nil {
		return fmt.Errorf("error deleting post: %v", err)
	}

	return nil
}
