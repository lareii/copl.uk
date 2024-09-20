package comments

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NewCommentBody struct {
	Content string `json:"content" validate:"required,min=1,max=500"`
}

func CreateComment(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body NewCommentBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body.",
		})
	}

	if err := utils.Validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing or invalid fields.",
		})
	}

	id := c.Params("post_id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID.",
		})
	}
	post, err := models.GetPostByID(postID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Post not found.",
		})
	}

	comment := models.Comment{
		Post:    postID,
		Author:  user.ID,
		Content: body.Content,
	}

	createdComment, err := models.CreateComment(comment)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating comment.",
		})
	}

	if user.ID != post.Author {
		notification := models.Notification{
			TargetUserID: post.Author,
			SourceUserID: user.ID,
			Type:         "comment_created",
			TypeContent:  post.ID.Hex(),
		}
		_ = models.CreateNotification(notification)
	}

	return c.Status(fiber.StatusCreated).JSON(models.CommentResponse{
		Message: "Comment created.",
		Comment: models.CommentResponseContent{
			ID:        createdComment.ID,
			CreatedAt: createdComment.CreatedAt,
			UpdatedAt: createdComment.UpdatedAt,
			Post:      createdComment.Post,
			Author: models.CommentResponseAuthor{
				ID:          user.ID,
				CreatedAt:   user.CreatedAt,
				Role:        user.Role,
				DisplayName: user.DisplayName,
				Username:    user.Username,
				About:       user.About,
				Points:      user.Points,
			},
			Content: createdComment.Content,
			Likes:   createdComment.Likes,
		},
	})
}
