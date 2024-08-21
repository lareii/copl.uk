package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func Ping(c *fiber.Ctx) error {
	c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "pong"})

	return nil
}
