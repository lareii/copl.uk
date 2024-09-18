package me

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func GetNotifications(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	if limit > 30 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Limit must be less than 30.",
		})
	}

	notifications, err := models.GetNotifications(int64(limit), int64(offset), user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message":       "Notifications found.",
		"notifications": notifications,
	})
}
