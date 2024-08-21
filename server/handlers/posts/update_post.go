package posts

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UpdatePostBody struct {
	Content string `json:"content"`
	Like    *bool  `json:"like"`
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
		"$set": bson.M{"updated_at": primitive.Timestamp{T: uint32(time.Now().Unix())}},
	}

	if body.Content != "" {
		if post.Author.ID != user.ID {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authorized.",
			})
		}

		update["$set"] = bson.M{"content": body.Content}
	}

	if body.Like != nil {
		if *body.Like {
			update["$addToSet"] = bson.M{"likes": user.ID}
		} else {
			update["$pull"] = bson.M{"likes": user.ID}
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
