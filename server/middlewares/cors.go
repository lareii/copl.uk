package middlewares

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

func CORSMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		clientHost := os.Getenv("CLIENT_HOST")
		if clientHost == "" {
			clientHost = "*"
		}

		c.Set("Access-Control-Allow-Origin", clientHost)
		c.Set("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH")
		c.Set("Access-Control-Allow-Headers", "Content-Type")
		c.Set("Access-Control-Allow-Credentials", "true")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusNoContent)
		}

		return c.Next()
	}
}
