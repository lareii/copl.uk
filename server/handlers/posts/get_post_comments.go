package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CommentsResponse struct {
	Message  string                          `json:"message"`
	Comments []models.CommentResponseContent `json:"comments"`
}

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

	authorMap := make(map[primitive.ObjectID]models.User)
	for _, authorID := range authorIDs {
		author, err := models.GetUserByID(authorID)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error fetching comment authors.",
			})
		}
		authorMap[author.ID] = author
	}

	var responseComments []models.CommentResponseContent
	for _, comment := range comments {
		author := authorMap[comment.Author]

		responseComments = append(responseComments, models.CommentResponseContent{
			ID:        comment.ID,
			CreatedAt: comment.CreatedAt,
			UpdatedAt: comment.UpdatedAt,
			Post:      comment.Post,
			Author: models.CommentResponseAuthor{
				ID:          author.ID,
				CreatedAt:   author.CreatedAt,
				DisplayName: author.DisplayName,
				Username:    author.Username,
				About:       author.About,
				Points:      author.Points,
			},
			Content: comment.Content,
			Likes:   comment.Likes,
		})
	}

	return c.Status(fiber.StatusOK).JSON(CommentsResponse{
		Message:  "Comments found.",
		Comments: responseComments,
	})
}
