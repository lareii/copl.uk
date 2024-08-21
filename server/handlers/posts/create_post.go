package posts

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/models"
)

type NewPostBody struct {
	Content string `json:"content" validate:"required"`
}

func CreatePost(c *fiber.Ctx) error {
	user, ok := c.Locals("user").(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "User not authenticated."})
	}

	var body NewPostBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request body."})
	}

	var validate = validator.New()
	if err := validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Missing or invalid fields."})
	}

	user.Email = ""
	user.Password = ""
	user.About = ""

	post := models.Post{
		Author:  user,
		Content: body.Content,
	}

	createdPost, err := models.CreatePost(post)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error creating post."})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Post created.",
		"post":    createdPost,
	})
}
