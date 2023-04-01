package service

import (
	"changeme/tools"
	"encoding/json"
	"fmt"
	"github.com/oschwald/geoip2-golang"
	"github.com/tidwall/gjson"
	"net"
	"os/exec"
	"path"
	"runtime"
	"strconv"
	"strings"
	"syscall"
)

var ip string

// Greet returns a greeting for the given name
func (a *App) GreetLogin(loginInfo string) string {
	result := gjson.GetMany(loginInfo, "username", "password", "ip")
	url := tools.ActionUrl(result[2].Str, "login")
	params := map[string]string{}
	body, _ := json.Marshal(map[string]string{
		"username": result[0].Str,
		"password": result[1].Str,
	})

	res, err := tools.XPost(url, params, string(body))
	if err != nil {
		return tools.ResponseData(strconv.Itoa(tools.CodeServerBusy), strings.Replace(err.Error(), "\"", "", -1))
	}
	ip = result[2].Str
	return string(res)
}

func (a *App) GreetSqlQuery(sqlAction string) string {
	result := gjson.GetMany(sqlAction, "sql", "token")
	url := tools.ActionUrl(ip, "querySql")
	params := make(map[string]string, 1)
	body, _ := json.Marshal(map[string]string{
		"sql":  result[0].Str,
		"type": "1",
	})
	params["token"] = result[1].Str

	res, err := tools.XPost(url, params, string(body))
	if err != nil {
		return tools.ResponseData(strconv.Itoa(tools.CodeServerBusy), strings.Replace(err.Error(), "\"", "", -1))
	}

	return string(res)
}

func (a *App) GreetSqlExec(sqlAction string) string {
	result := gjson.GetMany(sqlAction, "sql", "token")
	url := tools.ActionUrl(ip, "execSql")
	params := map[string]string{}
	body, _ := json.Marshal(map[string]string{
		"sql": result[0].Str,
	})
	params["token"] = result[1].Str
	res, err := tools.XPost(url, params, string(body))
	if err != nil {
		return tools.ResponseData(strconv.Itoa(tools.CodeServerBusy), strings.Replace(err.Error(), "\"", "", -1))
	}

	return string(res)
}

func (a *App) GreetExplainSlow(sqlFilter string) string {
	result := gjson.GetMany(sqlFilter, "file", "lastHour", "timeRange", "sqlType")
	ptFilter := map[string]any{
		"file":      result[0].Str,
		"lastHour":  result[1].Str,
		"timeRange": result[2].Array(),
		"sqlType":   result[3].Str,
	}
	res := CmdPtQueryDigest(ptFilter)
	fmt.Println(res)
	return res
}

func CmdPtQueryDigest(ptFilter map[string]any) string {
	filePath := ptFilter["file"].(string)
	timeRange := ptFilter["timeRange"].([]gjson.Result)
	lastHour := ptFilter["lastHour"].(string)

	_, filename, _, _ := runtime.Caller(0)
	ptPath := path.Dir(filename)

	cmdString := "perl ./pt-query-digest " + strings.Replace(filePath, "\\", "/", -1)
	if lastHour != "" {
		cmdString += " --since=" + lastHour + "h"
	} else if len(timeRange) == 2 {
		cmdString += " --since '" + timeRange[0].String() + "' --until '" + timeRange[1].String() + "'"
	}

	cmdString += " --output json"
	cmd := exec.Command("cmd", "/C", cmdString)
	cmd.Dir = ptPath + "/script"
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	output, err := cmd.Output()

	if err != nil {
		return fmt.Sprintf("Execute cmd failed with error:%s", err.Error())
	}

	return string(output)
}

func (a *App) GreetExplainRdb(rdbFile string) string {
	result := gjson.GetMany(rdbFile, "file")
	filePath := result[0].Str
	_, filename, _, _ := runtime.Caller(0)
	ptPath := path.Dir(filename)
	cmdString := "rdr dump " + strings.Replace(filePath, "\\", "/", -1)
	cmd := exec.Command("cmd", "/C", cmdString)
	cmd.Dir = ptPath + "/script"
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	output, err := cmd.Output()

	if err != nil {
		return fmt.Sprintf("Execute cmd failed with error:%s", err.Error())
	}

	return string(output)
}

func (a *App) GreetExplainNginx(nginxFile string) string {
	result := gjson.GetMany(nginxFile, "file")
	filePath := result[0].Str
	_, filename, _, _ := runtime.Caller(0)
	ptPath := path.Dir(filename)

	data := make(map[string]any, 3)
	cmdFilter := [4]string{"0", "1", "2", "5"}
	for _, item := range cmdFilter {
		cmdString := "nginx-log-analyzer -t " + item + " -n 1000 " + strings.Replace(filePath, "\\", "/", -1)
		cmd := exec.Command("cmd", "/C", cmdString)
		cmd.Dir = ptPath + "/script"
		cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		output, err := cmd.Output()
		if err != nil {
			return fmt.Sprintf("Execute cmd failed with error:%s", err.Error())
		}
		data[item] = nginxParse(string(output), item)
	}

	bytes, _ := json.Marshal(data)
	return string(bytes)
}

func geoIP2(ipString string) (string, string) {
	_, filename, _, _ := runtime.Caller(0)
	ptPath := path.Dir(filename)
	city := ptPath + "/script/City.mmdb"
	db, _ := geoip2.Open(city)
	defer db.Close()
	// If you are using strings that may be invalid, check that ip is not nil
	ipTmp := net.ParseIP(ipString)
	record, _ := db.City(ipTmp)

	location := record.Country.Names["zh-CN"] + "-"
	if len(record.Subdivisions) > 0 {
		location += record.Subdivisions[0].Names["zh-CN"] + "-"
	}
	location += record.City.Names["zh-CN"]
	var country = ""
	if ipString == "127.0.0.1" || record.Country.Names["en"] == "China" {
		country = "1"
	} else if record.Country.Names["en"] == "" {
		country = "3"
	} else {
		country = "2"
	}

	return location, country
}

func nginxParse(s, t string) any {
	tmp := strings.Split(s, "\n")
	data := make([]interface{}, 0)
	switch t {
	case "0":
		tmpMap := make(map[string]string, 1)
		for key, val := range tmp {
			ws := strings.Fields(val)
			if len(ws) > 0 {
				for index, wd := range ws {
					if index == 1 {
						if key == 0 {
							tmpMap["pv"] = wd
						} else {
							tmpMap["uv"] = wd
						}
					}
				}
			}
		}
		data = append(data, tmpMap)
	case "1":
		for _, val := range tmp {
			ws := strings.Fields(val)
			if len(ws) > 0 {
				tmpMap := make(map[string]string, 2)
				for index, wd := range ws {
					if index == 0 {
						tmpMap["ip"] = strings.Trim(wd, `'"`)
						location, country := geoIP2(strings.Trim(wd, `'"`))
						tmpMap["location"] = location
						tmpMap["country"] = country
					} else if index == 2 {
						tmpMap["hits"] = wd
					}
				}
				data = append(data, tmpMap)
			}
		}

	case "2":
		for _, val := range tmp {
			ws := strings.Fields(val)
			if len(ws) > 0 {
				tmpMap := make(map[string]string, 2)
				for index, wd := range ws {
					if index == 0 {
						tmpMap["fun"] = strings.Trim(wd, `|--"`)
					} else if index == 1 {
						tmpMap["url"] = wd
					} else if index == 2 {
						tmpMap["http"] = wd
					} else if index == 4 {
						tmpMap["hits"] = wd
					}
				}
				data = append(data, tmpMap)
			}
		}

	case "5":
		var statusCode string
		for _, val := range tmp {
			ws := strings.Fields(val)
			if len(ws) > 0 {
				tmpMap := make(map[string]string, 2)
				for index, wd := range ws {
					if string(wd[0]) != "|" && index == 0 {
						statusCode = wd
						break
					}
					if index == 0 {
						tmpMap["fun"] = strings.Trim(wd, `|--"`)
					} else if index == 1 {
						tmpMap["url"] = wd
					} else if index == 2 {
						tmpMap["http"] = wd
					} else if index == 4 {
						tmpMap["hits"] = wd
					}
					tmpMap["status"] = statusCode
				}
				if len(tmpMap) > 0 {
					data = append(data, tmpMap)
				}
			}
		}

	default:
		return nil
	}
	return data
}
