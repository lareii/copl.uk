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

	var responsePosts []models.PostResponseContent
	for _, post := range posts {
		responsePosts = append(responsePosts, models.PostResponseContent{
			ID:        post.ID,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
			Author: models.PostResponseAuthor{
				ID:          user.ID,
				CreatedAt:   user.CreatedAt,
				DisplayName: user.DisplayName,
				Username:    user.Username,
				About:       user.About,
				Points:      user.Points,
			},
			Content:  post.Content,
			Likes:    post.Likes,
			Comments: post.Comments,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User posts found.",
		"posts":   responsePosts,
	})
}
