package models

import (
	"context"
	"fmt"
	"time"

	"github.com/lareii/copl.uk/server/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Post struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CreatedAt time.Time           `bson:"created_at" json:"created_at"`
	AuthorID  *primitive.ObjectID `bson:"author_id" json:"author_id"`
	Content   string              `bson:"content" json:"content"`
	Likes     int                 `bson:"likes" json:"likes"`
}

func GetPostByID(postID primitive.ObjectID) (Post, error) {
	var post Post
	err := db.Posts.FindOne(context.Background(), bson.M{"_id": postID}).Decode(&post)
	if err != nil {
		return post, fmt.Errorf("error fetching post: %v", err)
	}

	return post, nil
}

func GetPosts(limit, offset int64) ([]Post, error) {
	var posts []Post
	cursor, err := db.Posts.Find(context.Background(), bson.M{}, &options.FindOptions{
		Limit: &limit,
		Skip:  &offset,
		Sort:  bson.M{"created_at": -1},
	})
	if err != nil {
		return posts, fmt.Errorf("error fetching posts: %v", err)
	}

	err = cursor.All(context.Background(), &posts)
	if err != nil {
		return posts, fmt.Errorf("error decoding posts: %v", err)
	}

	return posts, nil
}

func CreatePost(post Post) error {
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
