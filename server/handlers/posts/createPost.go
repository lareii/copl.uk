package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
)

type PostBody struct {
	Content string `json:"content"`
}

func CreatePost(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	var body PostBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	if body.Content == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	author := user.(models.User)
	author.Password = ""
	author.Email = ""

	post := models.Post{
		Author:  author,
		Content: body.Content,
	}

	createdPost, err := models.CreatePost(post)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating post."})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Post created.",
		"post":    createdPost,
	})
}
