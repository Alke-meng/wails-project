package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/juju/ratelimit"
	"net/http"
	"time"
)

func RateLimitMiddleware(fillInterval time.Duration, cap int64) func(c *gin.Context) {
	bucket := ratelimit.NewBucket(fillInterval, cap)
	return func(c *gin.Context) {
		// 如果取不到令牌就中断本次请求返回 rate limit...
		if bucket.TakeAvailable(1) < 1 {
			c.JSON(http.StatusNotFound, gin.H{
				"code": 1000,
				"msg":  "系统繁忙，请稍后再试",
				"data": "",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
