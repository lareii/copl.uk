package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func User(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	user.Password = ""

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User authenticated.",
		"user":    user,
	})
}
