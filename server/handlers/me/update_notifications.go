package me

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdateNotificationBody struct {
	Read *bool `json:"read" validate:"required"`
}

func UpdateNotification(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body UpdateNotificationBody
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

	id := c.Params("id")
	notificationID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid notification ID.",
		})
	}

	notification, err := models.GetNotificationByID(notificationID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching notification.",
		})
	}

	if notification.TargetUserID != user.ID {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authorized.",
		})
	}

	err = models.UpdateNotification(notificationID, *body.Read)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating notification.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Notification updated.",
	})
}
