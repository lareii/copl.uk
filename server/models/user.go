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

type User struct {
	ID          primitive.ObjectID   `bson:"_id" json:"id"`
	CreatedAt   primitive.Timestamp  `bson:"created_at" json:"created_at"`
	IsBanned    bool                 `bson:"is_banned" json:"is_banned,omitempty"`
	Role        string               `bson:"role" json:"role,omitempty"`
	Email       string               `bson:"email" json:"email,omitempty"`
	DisplayName string               `bson:"display_name" json:"display_name"`
	Username    string               `bson:"username" json:"username"`
	Password    string               `bson:"password" json:"password,omitempty"`
	About       string               `bson:"about" json:"about"`
	Points      uint                 `bson:"points" json:"points"`
	Followers   []primitive.ObjectID `bson:"followers" json:"followers"`
	Following   []primitive.ObjectID `bson:"following" json:"following"`
}

func GetUserByID(id primitive.ObjectID) (user User, err error) {
	err = database.Users.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, nil
	}

	return user, err
}

func GetUserByUsername(username string) (user User, err error) {
	err = database.Users.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, nil
	}

	return user, err
}

func GetUserByEmail(email string) (user User, err error) {
	err = database.Users.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, nil
	}

	return user, err
}

func GetUsers(limit, offset int64, filter bson.M, sort bson.M) ([]User, error) {
	var users []User
	cursor, err := database.Users.Find(context.Background(), filter, &options.FindOptions{
		Limit: &limit,
		Skip:  &offset,
		Sort:  sort,
	})
	if err != nil {
		return users, fmt.Errorf("error fetching users: %v", err)
	}

	err = cursor.All(context.Background(), &users)
	if err != nil {
		return users, fmt.Errorf("error decoding users: %v", err)
	}

	return users, nil
}

func CreateUser(user User) error {
	user.ID = primitive.NewObjectID()
	user.CreatedAt = primitive.Timestamp{
		T: uint32(time.Now().Unix()),
	}
	user.IsBanned = false
	user.Role = "user"
	user.About = "ben bir copl.uk kullanıcısıyım."
	user.Points = 0
	user.Followers = []primitive.ObjectID{}
	user.Following = []primitive.ObjectID{}

	_, err := database.Users.InsertOne(context.Background(), user)
	if err != nil {
		return fmt.Errorf("error creating user: %v", err)
	}

	return nil
}

func UpdateUser(userID primitive.ObjectID, update bson.M) (User, error) {
	var user User
	options := options.FindOneAndUpdate().SetReturnDocument(options.After)
	err := database.Users.FindOneAndUpdate(context.Background(), bson.M{"_id": userID}, update, options).Decode(&user)
	if err != nil {
		return user, fmt.Errorf("error updating user: %v", err)
	}

	return user, nil
}
