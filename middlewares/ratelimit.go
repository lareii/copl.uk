package middlewares

import (
	"time"

	"github.com/didip/tollbooth/v7"
	"github.com/didip/tollbooth/v7/limiter"
	"github.com/gin-gonic/gin"
)

func RateLimitMiddleware() gin.HandlerFunc {
	lmt := tollbooth.NewLimiter(10, &limiter.ExpirableOptions{DefaultExpirationTTL: time.Hour})

	return func(c *gin.Context) {
		lmt.SetIPLookups([]string{"RemoteAddr", "X-Forwarded-For", "X-Real-IP"})
		httpError := tollbooth.LimitByRequest(lmt, c.Writer, c.Request)

		if httpError != nil {
			c.JSON(httpError.StatusCode, gin.H{"message": httpError.Message})
			c.Abort()
			return
		}

		c.Next()
	}
}
