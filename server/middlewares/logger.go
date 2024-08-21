package middlewares

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func LoggerMiddleware() fiber.Handler {
	file, err := os.OpenFile("./app.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		panic("error opening log file: " + err.Error())
	}
	return logger.New(logger.Config{
		Output: file,
	})
}
