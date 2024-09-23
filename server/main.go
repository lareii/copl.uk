package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	"github.com/lareii/copl.uk/server/database"
	"github.com/lareii/copl.uk/server/router"
)

func init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	database.Connect()
}

func main() {
	defer database.Disconnect()

	app := fiber.New()
	app.Use(recover.New())

	router.SetupRouter(app)

	app.Listen(os.Getenv("APP_HOST") + ":" + os.Getenv("APP_PORT"))
}
