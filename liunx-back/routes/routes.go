package routes

import (
	"gin/controllers"
	"gin/logger"
	"gin/middlewares"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func Setup() *gin.Engine {
	r := gin.New()
	r.Use(Cors())
	r.Use(logger.GinLogger(), logger.GinRecovery(true))

	r.POST("/login", middlewares.RateLimitMiddleware(1*time.Second, 1), controllers.LoginHandler)

	r.POST("/querySql", middlewares.JWTAuthMiddleware(), controllers.QueryDSqlHandler)

	r.POST("/execSql", controllers.ExecSqlHandler)

	return r
}

func Cors() gin.HandlerFunc {
	return func(context *gin.Context) {
		method := context.Request.Method
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token, x-token")
		context.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PATCH, PUT")
		context.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		context.Header("Access-Control-Allow-Credentials", "true")
		if method == "OPTIONS" {
			context.AbortWithStatus(http.StatusNoContent)
		}
	}
}
