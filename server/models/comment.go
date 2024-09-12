package models

import (
	"context"
	"fmt"
	"time"

	"github.com/lareii/copl.uk/server/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Comment struct {
	ID        primitive.ObjectID   `bson:"_id" json:"id"`
	CreatedAt primitive.Timestamp  `bson:"created_at" json:"created_at"`
	UpdatedAt primitive.Timestamp  `bson:"updated_at" json:"updated_at"`
	Post      primitive.ObjectID   `bson:"post" json:"post"`
	Author    primitive.ObjectID   `bson:"author" json:"author"`
	Content   string               `bson:"content" json:"content"`
	Likes     []primitive.ObjectID `bson:"likes" json:"likes"`
}

type CommentResponse struct {
	Message string                 `json:"message"`
	Comment CommentResponseContent `json:"comment"`
}

type CommentResponseContent struct {
	ID        primitive.ObjectID    `json:"id"`
	CreatedAt primitive.Timestamp   `json:"created_at"`
	UpdatedAt primitive.Timestamp   `json:"updated_at"`
	Post      primitive.ObjectID    `json:"post"`
	Author    CommentResponseAuthor `json:"author"`
	Content   string                `json:"content"`
	Likes     []primitive.ObjectID  `json:"likes"`
}

type CommentResponseAuthor struct {
	ID          primitive.ObjectID  `json:"id"`
	CreatedAt   primitive.Timestamp `json:"created_at"`
	DisplayName string              `json:"display_name"`
	Username    string              `json:"username"`
	About       string              `json:"about,omitempty"`
	Points      uint                `json:"points"`
}

func GetCommentByID(commentID primitive.ObjectID) (Comment, error) {
	var comment Comment
	err := database.Comments.FindOne(context.Background(), bson.M{"_id": commentID}).Decode(&comment)
	if err != nil {
		return comment, fmt.Errorf("error fetching comment: %v", err)
	}

	return comment, nil
}

func GetCommentsByPostID(postID primitive.ObjectID, limit, offset int64) ([]Comment, error) {
	var comments []Comment
	cursor, err := database.Comments.Find(context.Background(), bson.M{"post": postID}, &options.FindOptions{
		Limit: &limit,
		Skip:  &offset,
		Sort:  bson.M{"created_at": -1},
	})
	if err != nil {
		return comments, fmt.Errorf("error fetching comments: %v", err)
	}

	err = cursor.All(context.Background(), &comments)
	if err != nil {
		return comments, fmt.Errorf("error decoding comments: %v", err)
	}

	return comments, nil
}

func CreateComment(comment Comment) (Comment, error) {
	comment.ID = primitive.NewObjectID()

	timeNow := primitive.Timestamp{T: uint32(time.Now().Unix())}
	comment.CreatedAt = timeNow
	comment.UpdatedAt = timeNow
	comment.Likes = []primitive.ObjectID{}

	_, err := database.Comments.InsertOne(context.Background(), comment)
	if err != nil {
		return comment, fmt.Errorf("error creating comment: %v", err)
	}

	_, err = database.Posts.UpdateOne(context.Background(), bson.M{"_id": comment.Post}, bson.M{"$inc": bson.M{"comments": 1}})
	if err != nil {
		return comment, fmt.Errorf("error updating post: %v", err)
	}

	return comment, nil
}

func DeleteComment(commentID primitive.ObjectID) error {
	comment, err := GetCommentByID(commentID)
	if err != nil {
		return fmt.Errorf("error fetching comment: %v", err)
	}

	_, err = database.Comments.DeleteOne(context.Background(), bson.M{"_id": commentID})
	if err != nil {
		return fmt.Errorf("error deleting comment: %v", err)
	}

	_, err = database.Posts.UpdateOne(context.Background(), bson.M{"_id": comment.Post}, bson.M{"$inc": bson.M{"comments": -1}})
	if err != nil {
		return fmt.Errorf("error updating post: %v", err)
	}

	return nil
}

func UpdateComment(commentID primitive.ObjectID, update bson.M) (Comment, error) {
	var comment Comment
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	err := database.Comments.FindOneAndUpdate(context.Background(), bson.M{"_id": commentID}, update, options).Decode(&comment)
	if err != nil {
		fmt.Printf("Update error: %v\n", err)
		return comment, fmt.Errorf("error updating comment: %v", err)
	}

	return comment, nil
}
