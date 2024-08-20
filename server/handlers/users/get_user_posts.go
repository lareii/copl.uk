package users

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
)

func GetUserPosts(c *gin.Context) {
	slug := c.Param("slug")
	user, err := models.GetUserByUsername(slug)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting user."})
		return
	}
	if user.Username == "" {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found."})
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

	posts, err := models.GetPostsByUser(user.ID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching posts."})
		return
	}

	if len(posts) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No posts found."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"posts": posts})
}
