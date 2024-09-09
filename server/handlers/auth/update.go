package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type UpdateUserBody struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
	About    string `json:"about"`
}

func UpdateUser(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body UpdateUserBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body.",
		})
	}

	update := bson.M{
		"$set": bson.M{},
	}

	if body.Name != "" {
		update["$set"].(bson.M)["name"] = body.Name
	}
	if body.Username != "" {
		checkUser, err := models.GetUserByUsername(body.Username)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error checking if user exists.",
			})
		}
		if checkUser.Username != "" {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"message": "Username already exists.",
			})
		}
		update["$set"].(bson.M)["username"] = body.Username
	}
	if body.Password != "" {
		hash, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
		update["$set"].(bson.M)["password"] = string(hash)
	}
	if body.About != "" {
		update["$set"].(bson.M)["about"] = body.About
	}

	err := models.UpdateUser(user.ID, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating user.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "User updated successfully.",
	})
}
