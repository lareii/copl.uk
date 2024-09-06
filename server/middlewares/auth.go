package middlewares

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/lareii/copl.uk/server/models"
)

func AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		cookie := c.Cookies("jwt")
		if cookie == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authenticated.",
			})
		}

		token, err := jwt.ParseWithClaims(
			cookie,
			&jwt.StandardClaims{},
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("JWT_SECRET")), nil
			})
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authenticated.",
			})
		}

		claims := token.Claims.(*jwt.StandardClaims)
		if claims.ExpiresAt < 0 {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "User not authenticated.",
			})
		}

		user, err := models.GetUserByID(claims.Issuer)
		if err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "User not found.",
			})
		}

		c.Locals("user", user)
		return c.Next()
	}
}
