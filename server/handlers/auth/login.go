package auth

import (
	"os"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/server/models"
	"golang.org/x/crypto/bcrypt"
)

type LoginBody struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func Login(c *fiber.Ctx) error {
	var body LoginBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request body."})
	}

	var validate = validator.New()
	if err := validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Missing or invalid fields."})
	}

	auth := models.ValidateUser(c)
	if auth.IsAuthenticated {
		c.Status(fiber.StatusConflict).JSON(fiber.Map{"message": "User already authenticated."})
		return nil
	}

	user, err := models.GetUserByUsername(body.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error fetching user."})
	}
	if user.Username == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials."})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials."})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.ID.Hex(),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error creating token."})
	}

	cookie := &fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
		Secure:   os.Getenv("MODE") == "production",
		SameSite: "Strict",
	}
	c.Cookie(cookie)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "User authenticated."})
}
