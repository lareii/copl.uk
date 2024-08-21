package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/handlers"
	"github.com/lareii/copl.uk/server/handlers/auth"
	"github.com/lareii/copl.uk/server/handlers/posts"
	"github.com/lareii/copl.uk/server/handlers/users"
	"github.com/lareii/copl.uk/server/middlewares"
)

func SetupRouter(app *fiber.App) {
	app.Get("/ping", handlers.Ping)

	authGroup := app.Group("/auth")
	authGroup.Post("/register", auth.Register)
	authGroup.Post("/login", auth.Login)
	authGroup.Post("/logout", auth.Logout)
	authGroup.Get("/me", middlewares.AuthMiddleware(), auth.User)

	userGroup := app.Group("/users")
	userGroup.Get("/:slug", middlewares.AuthMiddleware(), users.GetUser)
	userGroup.Get("/:slug/posts", middlewares.AuthMiddleware(), users.GetUserPosts)

	postGroup := app.Group("/posts")
	postGroup.Get("/", middlewares.AuthMiddleware(), posts.GetPosts)
	postGroup.Post("/", middlewares.AuthMiddleware(), posts.CreatePost)
	postGroup.Get("/:id", middlewares.AuthMiddleware(), posts.GetPost)
	postGroup.Delete("/:id", middlewares.AuthMiddleware(), posts.DeletePost)
}
