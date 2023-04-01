package controllers

import (
	"gin/dao/mysql"
	"gin/models"
	"gin/pkg/soar"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.uber.org/zap"
	"reflect"
)

func QueryDSqlHandler(c *gin.Context) {
	p := new(models.ParamQuerySql)

	var msg interface{}
	msg = "success"
	if err := c.ShouldBindJSON(p); err != nil {
		zap.L().Error("QueryDSqlHandler invalid param", zap.Error(err))
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			msg = err.Error()
		} else {
			msg = removeTopStruct(errs.Translate(trans))
		}
		ResponseErrorWithMsg(c, CodeInvalidParam, msg)
		return
	}

	res := soar.CmdSoar(p.Type, p.Sql)

	ResponseSuccess(c, res)
}

func ExecSqlHandler(c *gin.Context) {
	p := new(models.ParamExecSql)

	var msg interface{}
	msg = "success"
	if err := c.ShouldBindJSON(p); err != nil {
		zap.L().Error("ExecSqlHandler invalid param", zap.Error(err))
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			msg = err.Error()
		} else {
			msg = removeTopStruct(errs.Translate(trans))
		}
		ResponseErrorWithMsg(c, CodeInvalidParam, msg)
		return
	}

	res := mysql.ExecSqlDetail(p.Sql)
	if reflect.TypeOf(res).Kind() == reflect.String {
		ResponseErrorWithMsg(c, CodeInvalidParam, res)
		return
	}

	ResponseSuccess(c, res)
}
