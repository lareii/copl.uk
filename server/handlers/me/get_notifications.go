package me

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Notification struct {
	ID          primitive.ObjectID  `json:"id"`
	CreatedAt   primitive.Timestamp `json:"created_at"`
	TargetUser  NotificationUser    `json:"target_user"`
	SourceUser  NotificationUser    `json:"source_user"`
	Type        string              `json:"type"`
	TypeContent string              `json:"type_content"`
	Read        bool                `json:"read"`
}

type NotificationUser struct {
	ID          primitive.ObjectID  `json:"id"`
	CreatedAt   primitive.Timestamp `json:"created_at"`
	Role        string              `json:"role"`
	DisplayName string              `json:"display_name"`
	Username    string              `json:"username"`
	About       string              `json:"about,omitempty"`
	Points      uint                `json:"points"`
}

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

	var responseNotifications []Notification
	for _, notification := range notifications {
		targetUser, err := models.GetUserByID(notification.TargetUserID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching target user.",
			})
		}

		sourceUser, err := models.GetUserByID(notification.SourceUserID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching source user.",
			})
		}

		responseNotifications = append(responseNotifications, Notification{
			ID:        notification.ID,
			CreatedAt: notification.CreatedAt,
			TargetUser: NotificationUser{
				ID:          targetUser.ID,
				CreatedAt:   targetUser.CreatedAt,
				Role:        targetUser.Role,
				DisplayName: targetUser.DisplayName,
				Username:    targetUser.Username,
				About:       targetUser.About,
				Points:      targetUser.Points,
			},
			SourceUser: NotificationUser{
				ID:          sourceUser.ID,
				CreatedAt:   sourceUser.CreatedAt,
				Role:        sourceUser.Role,
				DisplayName: sourceUser.DisplayName,
				Username:    sourceUser.Username,
				About:       sourceUser.About,
				Points:      sourceUser.Points,
			},
			Type:        notification.Type,
			TypeContent: notification.TypeContent,
			Read:        notification.Read,
		})
	}

	return c.JSON(fiber.Map{
		"message":       "Notifications found.",
		"notifications": responseNotifications,
	})
}
