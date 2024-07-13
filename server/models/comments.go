package models

import "time"

type Comments struct {
	ID        string    `bson:"_id,omitempty" json:"id"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	AuthorID  string    `bson:"author_id" json:"author_id"`
	Content   string    `bson:"content" json:"content"`
	Likes     int       `bson:"likes" json:"likes"`
	PostID    string    `bson:"post_id" json:"post_id"`
}
