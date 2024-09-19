package me

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func GetUnreadNotifications(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	unreads, err := models.GetUnreadNotifications(user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching unread notifications.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Unread notifications fetched.",
		"unreads": unreads,
	})
}
