package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetPost(c *fiber.Ctx) error {
	id := c.Params("id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID.",
		})
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching post.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Post found.",
		"post":    post,
	})
}
