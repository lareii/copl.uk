package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/handlers"
)

func SetupRouter(app *fiber.App) {
	app.Get("/ping", handlers.Ping)
}
