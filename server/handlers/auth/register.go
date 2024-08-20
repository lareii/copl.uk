package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/models"
	"golang.org/x/crypto/bcrypt"
)

type RegisterBody struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
	About    string `json:"about"`
}

func Register(c *gin.Context) {
	var body RegisterBody
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Missing required fields."})
		return
	}

	userExists, err := models.GetUserByUsername(body.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error checking if user exists."})
		return
	}
	if userExists.Username != "" {
		c.JSON(http.StatusConflict, gin.H{"message": "User already exists."})
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	user := models.User{
		Email:    body.Email,
		Name:     body.Name,
		Username: body.Username,
		Password: string(hash),
	}
	if err := models.CreateUser(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating user."})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created."})
}
