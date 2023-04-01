package tools

import (
	"encoding/json"
	"fmt"
)

func ActionUrl(ip, action string) string {
	return fmt.Sprintf("http://%s/%s", ip, action)
}

func ResponseData(code, msg string) string {
	data, _ := json.Marshal(map[string]string{
		"code": code,
		"msg":  msg,
	})

	return string(data)
}
