package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func GetUser(c *fiber.Ctx) error {
	slug := c.Params("slug")
	user, err := models.GetUserByUsername(slug)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching user.",
		})
	}
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found.",
		})
	}

	user.Email = ""
	user.Password = ""

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User found.",
		"user":    user,
	})
}
