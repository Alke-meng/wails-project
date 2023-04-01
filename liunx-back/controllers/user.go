package controllers

import (
	"gin/logic"
	"gin/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.uber.org/zap"
)

func LoginHandler(c *gin.Context) {
	p := new(models.ParamLogin)

	var msg interface{}
	msg = "success"
	if err := c.ShouldBindJSON(p); err != nil {
		zap.L().Error("LoginHandler invalid param", zap.Error(err))
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			msg = err.Error()
		} else {
			msg = removeTopStruct(errs.Translate(trans))
		}
		ResponseErrorWithMsg(c, CodeInvalidParam, msg)
		return
	}
	token, err := logic.Login(p)
	if err != nil {
		ResponseError(c, CodeUserExist)
		return
	}

	data := map[string]string{"token": token}

	ResponseSuccess(c, data)
}
