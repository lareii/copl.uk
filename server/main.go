package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	"github.com/lareii/copl.uk/server/database"
	"github.com/lareii/copl.uk/server/middlewares"
	"github.com/lareii/copl.uk/server/router"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file.")
	}

	database.Setup()
}

func main() {
	defer database.Disconnect()

	app := fiber.New()

	app.Use(recover.New())
	app.Use(middlewares.LoggerMiddleware())
	app.Use(middlewares.CORSMiddleware())

	router.SetupRouter(app)
	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
