package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
)

func User(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	userModel, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "User data is not in the expected format."})
		return
	}

	userModel.Password = ""

	c.JSON(http.StatusOK, gin.H{
		"message": "User authenticated.",
		"user":    userModel,
	})
}
