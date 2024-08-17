package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GetPostsBody struct {
	Limit  int64 `json:"limit"`
	Offset int64 `json:"offset"`
}

func GetPost(c *gin.Context) {
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid post ID."})
		return
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching post."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"post": post})
}

func GetPosts(c *gin.Context) {
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	var body GetPostsBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	if body.Limit == 0 {
		body.Limit = 10
	}

	posts, err := models.GetPosts(body.Limit, body.Offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching posts."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"posts": posts})
}
