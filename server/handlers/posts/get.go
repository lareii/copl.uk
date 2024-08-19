package posts

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
		c.JSON(http.StatusNotFound, gin.H{"message": "Post not found."})
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

	limitStr := c.DefaultQuery("limit", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	limit, err := strconv.ParseInt(limitStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid limit value."})
		return
	}

	offset, err := strconv.ParseInt(offsetStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid offset value."})
		return
	}

	posts, err := models.GetPosts(limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching posts."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"posts": posts})
}
