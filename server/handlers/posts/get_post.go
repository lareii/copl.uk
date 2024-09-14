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

	return c.Status(fiber.StatusOK).JSON(models.PostResponse{
		Message: "Post found.",
		Post: models.PostResponseContent{
			ID:        post.ID,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
			Author: models.PostResponseAuthor{
				ID:          author.ID,
				CreatedAt:   author.CreatedAt,
				DisplayName: author.DisplayName,
				Role:        author.Role,
				Username:    author.Username,
				About:       author.About,
				Points:      author.Points,
			},
			Content:  post.Content,
			Likes:    post.Likes,
			Comments: post.Comments,
		},
	})
}
