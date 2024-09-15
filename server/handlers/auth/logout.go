package auth

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Logout(c *fiber.Ctx) error {
	if cookie := c.Cookies("jwt"); cookie == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "User not authenticated.",
		})
	}

	cookie := &fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure:   os.Getenv("MODE") == "production",
		SameSite: "None",
		Domain:   os.Getenv("COOKIE_DOMAIN"),
	}

	c.Cookie(cookie)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User logged out.",
	})
}
