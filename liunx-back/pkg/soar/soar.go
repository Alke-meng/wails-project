package soar

import (
	"fmt"
	"os/exec"
	"path"
	"runtime"
)

func CmdSoar(typeTab, sqlString string) string {
	_, filename, _, _ := runtime.Caller(0)
	soarPath := path.Dir(filename) + "/soarXiaoMi"
	var cmdString string
	switch typeTab {
	case "1": //sql分析
		cmdString = soarPath + " -query '" + sqlString + "'"
	case "2": //sql美化
		cmdString = soarPath + " -list-heuristic-rules"
	default:
		return "查询类型错误"
	}

	cmd := exec.Command("/bin/bash", "-c", cmdString)
	output, err := cmd.Output()
	if err != nil {
		return fmt.Sprintf("Execute cmd failed with error:%s", err.Error())
	}

	return string(output)
}
