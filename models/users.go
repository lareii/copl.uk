package models

import (
	"context"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	CreatedAt primitive.Timestamp `bson:"created_at" json:"created_at"`
	Email     string              `bson:"email" json:"email"`
	Username  string              `bson:"username" json:"username"`
	Password  string              `bson:"password" json:"password"`
	GuildID   *primitive.ObjectID `bson:"guild_id" json:"guild_id"`
}

type AuthStatus struct {
	IsAuthenticated bool   `json:"isAuthenticated"`
	Message         string `json:"message"`
	Id              string `json:"Id"`
}

func CreateUser(user User) error {
	user.ID = primitive.NewObjectID()
	user.CreatedAt = primitive.Timestamp{
		T: uint32(time.Now().Unix()),
	}
	user.GuildID = nil

	_, err := db.Users.InsertOne(context.Background(), user)
	if err != nil {
		return fmt.Errorf("error creating user: %v", err)
	}

	return nil
}

func ValidateUser(c *gin.Context) AuthStatus {
	cookie, _ := c.Cookie("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return AuthStatus{IsAuthenticated: false, Message: "Unauthorized.", Id: "0"}
	}

	claims := token.Claims.(*jwt.StandardClaims)
	user, err := GetUserByID(claims.Issuer)
	if err != nil && err == mongo.ErrNoDocuments {
		user = User{}
		return AuthStatus{IsAuthenticated: false, Message: "User not found.", Id: user.ID.Hex()}
	}

	return AuthStatus{IsAuthenticated: true, Message: "Authorized", Id: user.ID.Hex()}
}

func GetUserByID(id string) (user User, err error) {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return user, err
	}

	err = db.Users.FindOne(context.Background(), bson.M{"_id": oid}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, nil
	}

	return user, err
}

func GetUserByUsername(username string) (user User, err error) {
	err = db.Users.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, nil
	}

	return user, err
}
