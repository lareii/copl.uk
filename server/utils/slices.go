package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

func LikeContains(likes []primitive.ObjectID, id primitive.ObjectID) bool {
	for _, userID := range likes {
		if userID == id {
			return true
		}
	}

	return false
}
