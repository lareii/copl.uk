package models

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/server/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	ID        primitive.ObjectID  `bson:"_id" json:"id"`
	CreatedAt primitive.Timestamp `bson:"created_at" json:"created_at"`
	IsBanned  bool                `bson:"is_banned" json:"is_banned,omitempty"`
	Role      string              `bson:"role" json:"role,omitempty"`
	Email     string              `bson:"email,omitempty" json:"email,omitempty"`
	Name      string              `bson:"name" json:"name"`
	Username  string              `bson:"username" json:"username"`
	Password  string              `bson:"password,omitempty" json:"password,omitempty"`
	About     string              `bson:"about" json:"about,omitempty"`
	Points    int                 `bson:"points" json:"points,omitempty"`
}

type AuthStatus struct {
	IsAuthenticated bool   `json:"isAuthenticated"`
	Message         string `json:"message"`
	Id              string `json:"Id"`
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

func GetUsers(limit, offset int64) ([]User, error) {
	var users []User
	cursor, err := database.Users.Find(context.Background(), bson.M{}, &options.FindOptions{
		Limit: &limit,
		Skip:  &offset,
		Sort:  bson.M{"points": -1},
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

func ValidateUser(c *fiber.Ctx) AuthStatus {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return AuthStatus{IsAuthenticated: false, Message: "User not authenticated.", Id: "0"}
	}

	claims := token.Claims.(*jwt.StandardClaims)
	oid, err := primitive.ObjectIDFromHex(claims.Issuer)
	if err != nil {
		return AuthStatus{IsAuthenticated: false, Message: "User not authenticated.", Id: "0"}
	}
	user, err := GetUserByID(oid)
	if err != nil && err == mongo.ErrNoDocuments {
		user = User{}
		return AuthStatus{IsAuthenticated: false, Message: "User not found.", Id: user.ID.Hex()}
	}

	return AuthStatus{IsAuthenticated: true, Message: "User authenticated.", Id: user.ID.Hex()}
}

func CreateUser(user User) error {
	user.ID = primitive.NewObjectID()
	user.CreatedAt = primitive.Timestamp{
		T: uint32(time.Now().Unix()),
	}
	user.IsBanned = false
	user.Role = "user"
	user.About = "ben bir copl.uk kullanıcısıyım."
	user.Points = 1

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
