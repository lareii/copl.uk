package comments

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdateCommentBody struct {
	Content string `json:"content"`
	Like    *bool  `json:"like"`
}

func UpdateComment(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	id := c.Params("id")
	commentID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid comment ID.",
		})
	}

	var body UpdateCommentBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body.",
		})
	}

	comment, err := models.GetCommentByID(commentID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching comment.",
		})
	}

	update := bson.M{
		"$set": bson.M{},
	}

	if body.Content != "" {
		if comment.Author.ID != user.ID {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authorized.",
			})
		}

		update["$set"] = bson.M{"content": body.Content}
		update["$set"] = bson.M{"updated_at": primitive.Timestamp{T: uint32(time.Now().Unix())}}
	}

	if body.Like != nil {
		if *body.Like {
			update["$addToSet"] = bson.M{"likes": user.ID}
		} else {
			update["$pull"] = bson.M{"likes": user.ID}
		}
	}

	updatedComment, err := models.UpdateComment(commentID, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating comment.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Comment updated.",
		"comment": updatedComment,
	})
}
