package posts

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdatePostBody struct {
	Content string `json:"content" validate:"omitempty,max=2000"`
	Like    *bool  `json:"like" validate:"omitempty"`
}

func UpdatePost(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body UpdatePostBody
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

	id := c.Params("id")
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid post ID.",
		})
	}

	post, err := models.GetPostByID(postID)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Error fetching post.",
		})
	}

	update := bson.M{
		"$set": bson.M{},
	}

	if body.Content != "" {
		if post.Author != user.ID {
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
		if *body.Like && !utils.Contains(post.Likes, user.ID) {
			update["$addToSet"] = bson.M{"likes": user.ID}
			if post.Author != user.ID {
				notification := models.Notification{
					TargetUserID: post.Author,
					SourceUserID: user.ID,
					Type:         "post_liked",
					TypeContent:  post.ID.Hex(),
				}
				_ = models.CreateNotification(notification)

				models.UpdateUser(post.Author, bson.M{"$inc": bson.M{"points": 1}})
			}
		} else if !*body.Like && utils.Contains(post.Likes, user.ID) {
			update["$pull"] = bson.M{"likes": user.ID}
			if post.Author != user.ID {
				models.UpdateUser(post.Author, bson.M{"$inc": bson.M{"points": -1}})
			}
		}
	}

	updatedPost, err := models.UpdatePost(postID, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating post.",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Post updated.",
		"post":    updatedPost,
	})
}
