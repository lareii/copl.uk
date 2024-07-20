package middlewares

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/server/models"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
			c.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated."})
			c.Abort()
			return
		}

		claims := token.Claims.(*jwt.StandardClaims)
		user, err := models.GetUserByID(claims.Issuer)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"message": "User not found.",
				"userID":  user.ID,
			})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}
