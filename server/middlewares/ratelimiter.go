package middlewares

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
)

func RateLimiterMiddleware(max int, expiration time.Duration) fiber.Handler {
	config := limiter.Config{
		Max:        max,
		Expiration: expiration,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"message": "Too many requests",
			})
		},
	}

	if os.Getenv("MODE") == "production" {
		return limiter.New(config)
	} else {
		return func(c *fiber.Ctx) error {
			return c.Next()
		}
	}
}
