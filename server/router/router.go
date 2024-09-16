package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/handlers"
	"github.com/lareii/copl.uk/server/handlers/auth"
	"github.com/lareii/copl.uk/server/handlers/comments"
	"github.com/lareii/copl.uk/server/handlers/posts"
	"github.com/lareii/copl.uk/server/handlers/users"
	"github.com/lareii/copl.uk/server/middlewares"
)

func SetupRouter(app *fiber.App) {
	app.Get("/ping", handlers.Ping)

	authGroup := app.Group("/auth")
	authGroup.Post("/register", middlewares.RateLimiterMiddleware(1, 300), auth.Register)
	authGroup.Post("/login", auth.Login)
	authGroup.Post("/logout", auth.Logout)
	authGroup.Get("/me", middlewares.AuthMiddleware(), auth.User)
	authGroup.Patch("/me", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), auth.UpdateUser)
	authGroup.Get("/me/feed", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), auth.GetFeed)

	userGroup := app.Group("/users")
	userGroup.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.GetUsers)
	userGroup.Get("/:slug", middlewares.AuthMiddleware(), users.GetUser)
	userGroup.Get("/:slug/follows", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.Follows)
	userGroup.Post("/:slug/follows", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), users.FollowUser)
	userGroup.Get("/:slug/posts", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.GetUserPosts)

	postGroup := app.Group("/posts")
	postGroup.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), posts.GetPosts)
	postGroup.Post("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(5, 60), posts.CreatePost)
	postGroup.Get("/:id", middlewares.AuthMiddleware(), posts.GetPost)
	postGroup.Delete("/:id", middlewares.AuthMiddleware(), posts.DeletePost)
	postGroup.Patch("/:id", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), posts.UpdatePost)

	commentGroup := postGroup.Group("/:post_id/comments")
	commentGroup.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), posts.GetPostComments)
	commentGroup.Post("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(5, 60), comments.CreateComment)
	commentGroup.Get("/:id", middlewares.AuthMiddleware(), comments.GetComment)
	commentGroup.Delete("/:id", middlewares.AuthMiddleware(), comments.DeleteComment)
	commentGroup.Patch("/:id", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), comments.UpdateComment)
}
