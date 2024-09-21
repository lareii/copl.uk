package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lareii/copl.uk/server/handlers"
	"github.com/lareii/copl.uk/server/handlers/auth"
	"github.com/lareii/copl.uk/server/handlers/comments"
	"github.com/lareii/copl.uk/server/handlers/me"
	"github.com/lareii/copl.uk/server/handlers/posts"
	"github.com/lareii/copl.uk/server/handlers/users"
	"github.com/lareii/copl.uk/server/middlewares"
)

func setupAuthGroup(app *fiber.App) fiber.Router {
	g := app.Group("/auth")
	g.Post("/register", middlewares.RateLimiterMiddleware(1, 300), auth.Register)
	g.Post("/login", auth.Login)
	g.Post("/logout", auth.Logout)
	return g
}

func setupMeGroup(app *fiber.App) fiber.Router {
	g := app.Group("/me")
	g.Get("/", middlewares.AuthMiddleware(), me.User)
	g.Patch("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), me.UpdateUser)
	g.Get("/feed", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), me.GetFeed)
	g.Get("/notifications", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), me.GetNotifications)
	g.Patch("/notifications/:id", middlewares.AuthMiddleware(), me.UpdateNotification)
	g.Get("/notifications/unread", middlewares.AuthMiddleware(), me.GetUnreadNotifications)
	return g
}

func setupUserGroup(app *fiber.App) fiber.Router {
	g := app.Group("/users")
	g.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.GetUsers)
	g.Get("/:slug", middlewares.AuthMiddleware(), users.GetUser)
	g.Get("/:slug/follows", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.Follows)
	g.Post("/:slug/follows", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), users.FollowUser)
	g.Get("/:slug/posts", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), users.GetUserPosts)
	return g
}

func setupPostGroup(app *fiber.App) fiber.Router {
	g := app.Group("/posts")
	g.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), posts.GetPosts)
	g.Post("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(5, 60), posts.CreatePost)
	g.Get("/:id", middlewares.AuthMiddleware(), posts.GetPost)
	g.Delete("/:id", middlewares.AuthMiddleware(), posts.DeletePost)
	g.Patch("/:id", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), posts.UpdatePost)
	return g
}

func setupCommentGroup(postGroup fiber.Router) fiber.Router {
	g := postGroup.Group("/:post_id/comments")
	g.Get("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(20, 60), posts.GetPostComments)
	g.Post("/", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(5, 60), comments.CreateComment)
	g.Get("/:id", middlewares.AuthMiddleware(), comments.GetComment)
	g.Delete("/:id", middlewares.AuthMiddleware(), comments.DeleteComment)
	g.Patch("/:id", middlewares.AuthMiddleware(), middlewares.RateLimiterMiddleware(10, 60), comments.UpdateComment)
	return g
}

func SetupRouter(app *fiber.App) {
	app.Get("/ping", handlers.Ping)

	// Setup groups.
	setupAuthGroup(app)
	setupMeGroup(app)
	setupUserGroup(app)
	postGroup := setupPostGroup(app)
	setupCommentGroup(postGroup)
}
