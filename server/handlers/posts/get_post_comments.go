package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetPostComments(c *fiber.Ctx) error {
	id := c.Params("post_id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Invalid post ID.",
		})
	}

	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	comments, err := models.GetCommentsByPostID(postID, int64(limit), int64(offset))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching comments.",
		})
	}

	if len(comments) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No comments found.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "Comments found.",
		"comments": comments,
	})
}
