package posts

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
	"github.com/lareii/copl.uk/server/utils"
)

type NewPostBody struct {
	Content string `json:"content" validate:"required,min=1,max=1000"`
}

func CreatePost(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	var body NewPostBody
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

	post := models.Post{
		Author:  user.ID,
		Content: body.Content,
	}

	createdPost, err := models.CreatePost(post)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error creating post.",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Post created.",
		"post":    createdPost,
	})
}
