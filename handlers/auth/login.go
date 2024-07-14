package auth

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/models"
	"golang.org/x/crypto/bcrypt"
)

type LoginBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	body := &LoginBody{}
	if c.Bind(body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request body."})
		return
	}

	auth := models.ValidateUser(c)
	if auth.IsAuthenticated {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"message": "User already authenticated.",
			"userId":  auth.Id,
		})
		return
	}

	user, err := models.GetUserByUsername(body.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting user."})
		return
	}
	if user.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not found."})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password."})
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.ID.Hex(),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating token."})
		return
	}

	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
		Secure:   true,
	}

	c.SetCookie(cookie.Name, cookie.Value, cookie.Expires.Year(), cookie.Path, cookie.Domain, cookie.Secure, cookie.HttpOnly)

	c.JSON(http.StatusOK, gin.H{
		"message": "User authenticated.",
		"user":    user,
	})
}
