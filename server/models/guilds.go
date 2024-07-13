package models

import "time"

type Guilds struct {
	ID          string    `bson:"_id,omitempty" json:"id"`
	CreatedAt   time.Time `bson:"created_at" json:"created_at"`
	OwnerID     string    `bson:"owner_id" json:"owner_id"`
	Name        string    `bson:"name" json:"name"`
	Tag         string    `bson:"tag" json:"tag"`
	MemberCount int       `bson:"member_count" json:"member_count"`
}
