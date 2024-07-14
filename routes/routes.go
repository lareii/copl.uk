package routes

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/lareii/copl.uk/handlers"
	"github.com/lareii/copl.uk/handlers/auth"
	"github.com/lareii/copl.uk/handlers/posts"
	"github.com/lareii/copl.uk/middlewares"
)

func StartServer() error {
	port := ":" + os.Getenv("PORT")

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
	postsGroup := router.Group("/posts")
	{
		postsGroup.POST("/new", middlewares.AuthMiddleware(), posts.NewPost)
		postsGroup.POST("/remove", middlewares.AuthMiddleware(), posts.RemovePost)
	}

	return router
}
