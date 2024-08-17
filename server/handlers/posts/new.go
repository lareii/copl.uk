package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
)

type NewPostBody struct {
	Content string `json:"content"`
}

func NewPost(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	body := &NewPostBody{}
	if c.Bind(body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request body."})
		return
	}

	if body.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	userID := user.(models.User).ID
	post := models.Post{
		AuthorID: &userID,
		Content:  body.Content,
	}

	if err := models.CreatePost(post); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating post."})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Post created.",
		"post":    post,
	})
}
