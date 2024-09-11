package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"golang.org/x/crypto/bcrypt"
)

type RegisterBody struct {
	Email       string `json:"email" validate:"required,email"`
	DisplayName string `json:"display_name" validate:"required,min=1,max=25"` // jeeneeuhs
	Username    string `json:"username" validate:"required,min=3,max=25,username_valid"`
	Password    string `json:"password" validate:"required,min=8,max=50"`
}

func Register(c *fiber.Ctx) error {
	var body RegisterBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body.",
		})
	}

	if err := utils.Validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing or invalid fields.",
		})
	}

	user, err := models.GetUserByUsername(body.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error checking if user exists.",
		})
	}
	if user.Username != "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Username already in use.",
		})
	}

	user, err = models.GetUserByEmail(body.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error checking if user exists.",
		})
	}
	if user.Email != "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Email already in use.",
		})
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	user = models.User{
		Email:       body.Email,
		DisplayName: body.DisplayName,
		Username:    body.Username,
		Password:    string(hash),
	}
	if err := models.CreateUser(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating user.",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User created.",
	})
}
