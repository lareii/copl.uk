package models

import (
	"context"
	"fmt"
	"time"

	"github.com/lareii/copl.uk/server/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Post struct {
	ID        primitive.ObjectID   `bson:"_id" json:"id"`
	CreatedAt primitive.Timestamp  `bson:"created_at" json:"created_at"`
	UpdatedAt primitive.Timestamp  `bson:"updated_at" json:"updated_at"`
	Author    primitive.ObjectID   `bson:"author" json:"author"`
	Content   string               `bson:"content" json:"content"`
	Likes     []primitive.ObjectID `bson:"likes" json:"likes"`
	Comments  uint                 `bson:"comments" json:"comments"`
}

type PostResponse struct {
	Message string              `json:"message"`
	Post    PostResponseContent `json:"post"`
}

type PostResponseContent struct {
	ID        primitive.ObjectID   `json:"id"`
	CreatedAt primitive.Timestamp  `json:"created_at"`
	UpdatedAt primitive.Timestamp  `json:"updated_at"`
	Author    PostResponseAuthor   `json:"author"`
	Content   string               `json:"content"`
	Likes     []primitive.ObjectID `json:"likes"`
	Comments  uint                 `json:"comments"`
}

type PostResponseAuthor struct {
	ID          primitive.ObjectID  `json:"id"`
	CreatedAt   primitive.Timestamp `json:"created_at"`
	Role        string              `json:"role"`
	DisplayName string              `json:"display_name"`
	Username    string              `json:"username"`
	About       string              `json:"about,omitempty"`
	Points      uint                `json:"points"`
}

func GetPostByID(postID primitive.ObjectID) (post Post, err error) {
	err = database.Posts.FindOne(context.Background(), bson.M{"_id": postID}).Decode(&post)
	if err != nil && err == mongo.ErrNoDocuments {
		return post, nil
	}

	return post, err
}

func GetPosts(limit, offset int64, filter, sort bson.M) ([]Post, error) {
	var posts []Post
	cursor, err := database.Posts.Find(context.Background(), filter, &options.FindOptions{
		Limit: &limit,
		Skip:  &offset,
		Sort:  sort,
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

func CreatePost(post Post) (Post, error) {
	post.ID = primitive.NewObjectID()

	timeNow := primitive.Timestamp{T: uint32(time.Now().Unix())}
	post.CreatedAt = timeNow
	post.UpdatedAt = timeNow
	post.Likes = []primitive.ObjectID{}
	post.Comments = 0

	_, err := database.Posts.InsertOne(context.Background(), post)
	if err != nil {
		return Post{}, fmt.Errorf("error creating post: %v", err)
	}

	return post, nil
}

func DeletePost(postID primitive.ObjectID) error {
	_, err := database.Posts.DeleteOne(context.Background(), bson.M{"_id": postID})
	if err != nil {
		return fmt.Errorf("error deleting post: %v", err)
	}

	_, err = database.Comments.DeleteMany(context.Background(), bson.M{"post": postID})
	if err != nil {
		return fmt.Errorf("error deleting comments: %v", err)
	}

	return nil
}

func UpdatePost(postID primitive.ObjectID, update bson.M) (Post, error) {
	var post Post
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	err := database.Posts.FindOneAndUpdate(context.Background(), bson.M{"_id": postID}, update, options).Decode(&post)
	if err != nil {
		return post, fmt.Errorf("error updating post: %v", err)
	}

	return post, nil
}
