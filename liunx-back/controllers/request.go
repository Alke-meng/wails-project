package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
)

const CtxUserIDKey = "user_id"

func GetCurrentUser(c *gin.Context) (userID int64, err error) {
	uid, ok := c.Get(CtxUserIDKey)
	if !ok {
		err = errors.New("用户未登入")
		return
	}
	userID, ok = uid.(int64)
	if !ok {
		err = errors.New("用户未登入")
		return
	}
	return
}
