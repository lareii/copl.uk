package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson"
)

func Follows(c *fiber.Ctx) error {
	option := c.Query("option", "followers")
	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	if limit > 30 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Limit must be less than 30.",
		})
	}

	slug := c.Params("slug")
	user, err := models.GetUserByUsername(slug)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching user.",
		})
	}
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found.",
		})
	}

	var filter bson.M
	if option == "followers" {
		filter = bson.M{"_id": bson.M{"$in": user.Followers}}
	} else if option == "following" {
		filter = bson.M{"_id": bson.M{"$in": user.Following}}
	} else {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid option.",
		})
	}

	users, err := models.GetUsers(
		int64(limit),
		int64(offset),
		filter,
		bson.M{},
	)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching users.",
		})
	}

	var responseUsers []models.User
	for _, user := range users {
		user.Email = ""
		user.Password = ""

		responseUsers = append(responseUsers, user)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Users found.",
		"users":   responseUsers,
	})
}
