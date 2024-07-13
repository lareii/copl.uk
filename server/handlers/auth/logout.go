package auth

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func Logout(c *gin.Context) {
	if jwtCookie, err := c.Cookie("jwt"); err != nil || jwtCookie == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
		return
	}

	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	}

	c.SetCookie(cookie.Name, cookie.Value, cookie.Expires.Year(), cookie.Path, cookie.Domain, cookie.Secure, cookie.HttpOnly)

	c.JSON(http.StatusOK, gin.H{"message": "User logged out."})
}
