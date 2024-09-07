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

	var authorIDs []primitive.ObjectID
	for _, comment := range comments {
		authorIDs = append(authorIDs, comment.Author)
	}

	var authors []models.User
	for _, authorID := range authorIDs {
		author, err := models.GetUserByID(authorID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching comment authors.",
			})
		}
		authors = append(authors, author)
	}

	authorMap := make(map[primitive.ObjectID]models.User)
	for _, author := range authors {
		authorMap[author.ID] = author
	}

	var responseComments []fiber.Map
	for _, comment := range comments {
		author := authorMap[comment.Author]

		responseComments = append(responseComments, fiber.Map{
			"id":         comment.ID,
			"created_at": comment.CreatedAt,
			"updated_at": comment.UpdatedAt,
			"post":       comment.Post,
			"author": fiber.Map{
				"id":         author.ID,
				"created_at": author.CreatedAt,
				"name":       author.Name,
				"username":   author.Username,
				"about":      author.About,
				"points":     author.Points,
			},
			"content": comment.Content,
			"likes":   comment.Likes,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "Comments found.",
		"comments": responseComments,
	})
}
