package users

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func GetUserPosts(c *fiber.Ctx) error {
	slug := c.Params("slug")
	user, err := models.GetUserByUsername(slug)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching user.",
		})
	}
	if user.Username == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found.",
		})
	}

	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	posts, err := models.GetPostsByUser(user, int64(limit), int64(offset))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching user posts.",
		})
	}

	var responsePosts []fiber.Map
	for _, post := range posts {
		responsePosts = append(responsePosts, fiber.Map{
			"id":         post.ID,
			"created_at": post.CreatedAt,
			"updated_at": post.UpdatedAt,
			"author": fiber.Map{
				"id":         user.ID,
				"created_at": user.CreatedAt,
				"name":       user.Name,
				"username":   user.Username,
				"about":      user.About,
				"points":     user.Points,
			},
			"content":  post.Content,
			"likes":    post.Likes,
			"comments": post.Comments,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User posts found.",
		"posts":   responsePosts,
	})
}
