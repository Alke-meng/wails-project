package main

import (
	"context"
	"fmt"
	"gin/controllers"
	"gin/dao/mysql"
	"gin/logger"
	"gin/pkg/snowflake"
	"gin/routes"
	"gin/settings"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jessevdk/go-flags"
	"github.com/tidwall/gjson"
	"go.uber.org/zap"
)

type Option struct {
	Port int    `short:"p" long:"port" description:"remote port,example: -p 8081" required:"true"`
	Data string `short:"d" long:"data" description:"data,example: -d '{\"name\":\"aite\",\"pwd\":\"123\"}'" required:"true"`
}

var opt Option

func main() {
	//0、命令行启动
	if _, err := flags.Parse(&opt); err != nil {
		fmt.Printf("程序启动错误，请检查相关参数:%v。输入--help可查看帮助", err)
		return
	}

	//json 数据
	data := gjson.GetMany(opt.Data, "name", "pwd")
	if gjson.Result.String(data[0]) == "" || gjson.Result.String(data[1]) == "" {
		fmt.Println("程序启动错误，name/pwd为空。输入--help可查看帮助")
		return
	}

	httpPort := opt.Port

	// 1、加载配置
	if err := settings.Init(); err != nil {
		fmt.Printf("init setting err:%v\n", err)
		return
	}
	// 2、初始化日志
	if err := logger.Init(settings.Conf.LogConfig, settings.Conf.Mode); err != nil {
		fmt.Println("logger init fail: ", err)
		return
	}
	defer zap.L().Sync()
	zap.L().Debug("logger init success")

	defer mysql.Close()
	// 3、初始化MySQL
	if err := mysql.Init(settings.Conf.MySQLConfig); err != nil {
		fmt.Println("mysql init fail: ", err)
		return
	}

	// 雪花
	if err := snowflake.Init(settings.Conf.StartTime, settings.Conf.MachineID); err != nil {
		fmt.Println("snowflake init fail: ", err)
		return
	}

	// 语言设置
	if err := controllers.InitTrans("zh"); err != nil {
		fmt.Println("Trans init fail: ", err)
		return
	}

	// 5、注册路由
	r := routes.Setup()

	// 6、启动服务
	gin.SetMode(gin.DebugMode)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", httpPort),
		Handler: r,
	}

	fmt.Println("监听端口为：", httpPort)

	go func() {
		// 开启一个goroutine启动服务
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// 等待中断信号来优雅地关闭服务器，为关闭服务器操作设置一个5秒的超时
	quit := make(chan os.Signal, 1) // 创建一个接收信号的通道
	// kill 默认会发送 syscall.SIGTERM 信号
	// kill -2 发送 syscall.SIGINT 信号，我们常用的Ctrl+C就是触发系统SIGINT信号
	// kill -9 发送 syscall.SIGKILL 信号，但是不能被捕获，所以不需要添加它
	// signal.Notify把收到的 syscall.SIGINT或syscall.SIGTERM 信号转发给quit
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM) // 此处不会阻塞
	<-quit                                               // 阻塞在此，当接收到上述两种信号时才会往下执行
	zap.L().Info("Shutdown Server ...")
	// 创建一个5秒超时的context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	// 5秒内优雅关闭服务（将未处理完的请求处理完再关闭服务），超过5秒就超时退出
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown: ", err)
	}

	zap.L().Info("Server exiting")

}
