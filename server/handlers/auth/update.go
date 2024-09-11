package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type UpdateUserBody struct {
	Email       string `json:"email" validate:"omitempty,email"`
	DisplayName string `json:"display_name" validate:"omitempty,min=1,max=25"`
	Username    string `json:"username" validate:"omitempty,min=3,max=25,username_valid"`
	Password    string `json:"password" validate:"omitempty,min=8,max=50"`
	About       string `json:"about" validate:"omitempty,max=200"`
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

	if err := utils.Validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing or invalid fields.",
		})
	}

	update := bson.M{
		"$set": bson.M{},
	}

	if body.Email != "" {
		checkUser, err := models.GetUserByEmail(body.Email)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error checking if user exists.",
			})
		}

		if checkUser.Email != "" && body.Email != user.Email {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"message": "Email already in use.",
			})
		}

		update["$set"].(bson.M)["email"] = body.Email
	}

	if body.DisplayName != "" {
		update["$set"].(bson.M)["display_name"] = body.DisplayName
	}

	if body.Username != "" {
		checkUser, err := models.GetUserByUsername(body.Username)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error checking if user exists.",
			})
		}

		if checkUser.Username != "" && body.Username != user.Username {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"message": "Username already in use.",
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

	updatedUser, err := models.UpdateUser(user.ID, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating user.",
		})
	}

	updatedUser.Role = ""
	updatedUser.Password = ""

	return c.JSON(fiber.Map{
		"message": "User updated successfully.",
		"user":    updatedUser,
	})
}
