package routes

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/server/handlers"
	"github.com/lareii/copl.uk/server/handlers/auth"
	"github.com/lareii/copl.uk/server/handlers/posts"
	"github.com/lareii/copl.uk/server/handlers/users"
	"github.com/lareii/copl.uk/server/middlewares"
)

func StartServer() error {
	port := ":" + os.Getenv("PORT")

	gin.SetMode(os.Getenv("GIN_MODE"))
	router := SetupRouter()
	err := router.Run(port)
	return err
}

func SetupRouter() *gin.Engine {
	router := gin.New()
	router.SetTrustedProxies(nil)

	router.Use(gin.Recovery())
	//router.Use(middlewares.RateLimitMiddleware())
	router.Use(middlewares.CORSMiddleware())

	router.GET("/", handlers.Ping)

	authGroup := router.Group("/auth")
	{
		authGroup.GET("/me", middlewares.AuthMiddleware(), auth.User)
		authGroup.POST("/register", auth.Register)
		authGroup.POST("/login", auth.Login)
		authGroup.GET("/logout", auth.Logout)
	}
	userGroup := router.Group("/users")
	{
		userGroup.GET("/:slug", middlewares.AuthMiddleware(), users.GetUser)
		userGroup.GET("/:slug/posts", middlewares.AuthMiddleware(), users.GetUserPosts)
	}
	postsGroup := router.Group("/posts")
	{
		postsGroup.GET("", middlewares.AuthMiddleware(), posts.GetPosts)
		postsGroup.PUT("", middlewares.AuthMiddleware(), posts.CreatePost)
		postsGroup.GET("/:id", middlewares.AuthMiddleware(), posts.GetPost)
		postsGroup.DELETE("/:id", middlewares.AuthMiddleware(), posts.DeletePost)
	}

	return router
}
