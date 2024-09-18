package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"go.mongodb.org/mongo-driver/bson"
)

func FollowUser(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	slug := c.Params("slug")
	targetUser, err := models.GetUserByUsername(slug)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found.",
		})
	}
	if targetUser.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found.",
		})
	}
	if targetUser.ID == user.ID {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "You cannot follow yourself.",
		})
	}

	var updateTarget, updateUser bson.M

	isFollowing := utils.Contains(user.Following, targetUser.ID)
	if isFollowing {
		updateTarget = bson.M{"$pull": bson.M{"followers": user.ID}}
		updateUser = bson.M{"$pull": bson.M{"following": targetUser.ID}}
		models.UpdateUser(targetUser.ID, bson.M{"$inc": bson.M{"points": -2}})
	} else {
		updateTarget = bson.M{"$addToSet": bson.M{"followers": user.ID}}
		updateUser = bson.M{"$addToSet": bson.M{"following": targetUser.ID}}
		models.UpdateUser(targetUser.ID, bson.M{"$inc": bson.M{"points": 2}})
	}

	_, err = models.UpdateUser(targetUser.ID, updateTarget)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating target user followers.",
		})
	}

	_, err = models.UpdateUser(user.ID, updateUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating user following.",
		})
	}

	if isFollowing {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "User unfollowed successfully",
		})
	}

	notification := models.Notification{
		TargetUserID: targetUser.ID,
		SourceUserID: user.ID,
		Type:         "user_followed",
		TypeContent:  user.Username,
	}
	_ = models.CreateNotification(notification)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User followed successfully",
	})
}
