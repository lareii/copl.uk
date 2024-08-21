package auth

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"golang.org/x/crypto/bcrypt"
)

type RegisterBody struct {
	Email    string `json:"email" validate:"required,email"`
	Name     string `json:"name" validate:"required"`
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func Register(c *fiber.Ctx) error {
	var body RegisterBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request body."})
	}

	var validate = validator.New()
	if err := validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Missing or invalid fields."})
	}

	user, err := models.GetUserByUsername(body.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error checking if user exists."})
	}
	if user.Username != "" {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "User already exists."})
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	user = models.User{
		Email:    body.Email,
		Name:     body.Name,
		Username: body.Username,
		Password: string(hash),
	}
	if err := models.CreateUser(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error creating user."})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User created."})
}
