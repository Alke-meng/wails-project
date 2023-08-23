package controllers

type ResCode int64

const (
	CodeSuccess ResCode = 1 + iota
	CodeInvalidParam
	CodeUserExist
	CodeServerBusy
)

var codeMsgMap = map[ResCode]string{
	CodeSuccess:      "success",
	CodeInvalidParam: "请求参数错误",
	CodeUserExist:    "用户名或密码错误",
	CodeServerBusy:   "服务器错误",
}

func (c ResCode) Msg() string {
	msg, ok := codeMsgMap[c]
	if !ok {
		msg = codeMsgMap[CodeServerBusy]
	}

	return msg
}
