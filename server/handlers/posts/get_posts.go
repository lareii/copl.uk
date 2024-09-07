package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	var authorIDs []primitive.ObjectID
	for _, post := range posts {
		authorIDs = append(authorIDs, post.Author)
	}

	var authors []models.User
	for _, authorID := range authorIDs {
		author, err := models.GetUserByID(authorID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching post authors.",
			})
		}
		authors = append(authors, author)
	}

	authorMap := make(map[primitive.ObjectID]models.User)
	for _, author := range authors {
		authorMap[author.ID] = author
	}

	var responsePosts []fiber.Map
	for _, post := range posts {
		author := authorMap[post.Author]

		responsePosts = append(responsePosts, fiber.Map{
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
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Posts found.",
		"posts":   responsePosts,
	})
}
