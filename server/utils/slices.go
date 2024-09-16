package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

func Contains(slice []primitive.ObjectID, id primitive.ObjectID) bool {
	for _, item := range slice {
		if item == id {
			return true
		}
	}

	return false
}
