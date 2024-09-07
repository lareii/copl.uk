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

	author, err := models.GetUserByID(post.Author)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching post author.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Post found.",
		"post": fiber.Map{
			"id":         post.ID,
			"created_at": post.CreatedAt,
			"updated_at": post.UpdatedAt,
			"author": fiber.Map{
				"id":         author.ID,
				"created_at": author.CreatedAt,
				"name":       author.Name,
				"username":   author.Username,
				"about":      author.About,
				"points":     author.Points,
			},
			"content":  post.Content,
			"likes":    post.Likes,
			"comments": post.Comments,
		},
	})
}
