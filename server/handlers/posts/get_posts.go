package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

func GetPosts(c *fiber.Ctx) error {
	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	posts, err := models.GetPosts(int64(limit), int64(offset))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error fetching posts.",
		})
	}

	if len(posts) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No posts found.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Posts found.",
		"posts":   posts,
	})
}
