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

type Notification struct {
	ID           primitive.ObjectID  `bson:"_id" json:"id"`
	CreatedAt    primitive.Timestamp `bson:"created_at" json:"created_at"`
	TargetUserID primitive.ObjectID  `bson:"target_user_id" json:"target_user_id"`
	SourceUserID primitive.ObjectID  `bson:"source_user_id" json:"source_user_id"`
	Type         string              `bson:"type" json:"type"`
	TypeContent  string              `bson:"type_content" json:"type_content"`
	Read         bool                `bson:"read" json:"read"`
}

func GetNotifications(limit, offset int64, userID primitive.ObjectID) ([]Notification, error) {
	var notifications []Notification
	cursor, err := database.Notifications.Find(context.Background(),
		bson.M{"target_user_id": userID},
		&options.FindOptions{
			Limit: &limit,
			Skip:  &offset,
			Sort:  bson.M{"created_at": -1},
		})
	if err != nil {
		return notifications, fmt.Errorf("error fetching notifications: %v", err)
	}

	err = cursor.All(context.Background(), &notifications)
	if err != nil {
		return notifications, fmt.Errorf("error decoding notifications: %v", err)
	}

	return notifications, nil
}

func CreateNotification(notification Notification) error {
	notification.ID = primitive.NewObjectID()
	notification.CreatedAt = primitive.Timestamp{T: uint32(time.Now().Unix())}
	notification.Read = false

	_, err := database.Notifications.InsertOne(context.Background(), notification)
	if err != nil {
		return fmt.Errorf("error creating notification: %v", err)
	}

	return nil
}
