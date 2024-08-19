package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
)

func GetUser(c *gin.Context) {
	_, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

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

	user.Email = ""
	user.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "User found.",
		"user":    user,
	})
}
