package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func User(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User authenticated.",
		"user":    user,
	})
}
