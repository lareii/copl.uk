package comments

import (
	"slices"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/validate"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdateCommentBody struct {
	Content string `json:"content" validate:"omitempty,max=1000"`
	Like    *bool  `json:"like" validate:"omitempty"`
}

func UpdateComment(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body UpdateCommentBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body.",
		})
	}

	if err := validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Missing or invalid fields.",
		})
	}

	id := c.Params("id")
	commentID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid comment ID.",
		})
	}

	comment, err := models.GetCommentByID(commentID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching comment.",
		})
	}

	post, err := models.GetPostByID(comment.Post)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching post.",
		})
	}

	update := bson.M{
		"$set": bson.M{},
	}

	if body.Content != "" {
		if comment.Author != user.ID {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authorized.",
			})
		}

		update["$set"] = bson.M{
			"content":    body.Content,
			"updated_at": primitive.Timestamp{T: uint32(time.Now().Unix())},
		}
	}

	if body.Like != nil {
		if *body.Like && !slices.Contains(comment.Likes, user.ID) {
			update["$addToSet"] = bson.M{"likes": user.ID}
			if comment.Author != user.ID {
				notification := models.Notification{
					TargetUserID: post.Author,
					SourceUserID: user.ID,
					Type:         "comment_liked",
					TypeContent:  post.ID.Hex(),
				}
				_ = models.CreateNotification(notification)

				models.UpdateUser(comment.Author, bson.M{"$inc": bson.M{"points": 1}})
			}
		} else if !*body.Like && slices.Contains(comment.Likes, user.ID) {
			update["$pull"] = bson.M{"likes": user.ID}
			if comment.Author != user.ID {
				models.UpdateUser(comment.Author, bson.M{"$inc": bson.M{"points": -1}})
			}
		}
	}

	updatedComment, err := models.UpdateComment(commentID, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating comment.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Comment updated.",
		"comment": updatedComment,
	})
}
