package settings

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

var Conf = new(AppConfig)

type AppConfig struct {
	Name         string `mapstructure:"name"`
	Mode         string `mapstructure:"mode"`
	Version      string `mapstructure:"version"`
	StartTime    string `mapstructure:"start_time"`
	MachineID    int64  `mapstructure:"machine_id"`
	*LogConfig   `mapstructure:"log"`
	*MySQLConfig `mapstructure:"mysql"`
	*RedisConfig `mapstructure:"redis"`
}

type LogConfig struct {
	Level      string `mapstructure:"name"`
	Filename   string `mapstructure:"filename"`
	MaxSize    int    `mapstructure:"max_size"`
	MaxAge     int    `mapstructure:"max_age"`
	MaxBackups int    `mapstructure:"max_backups"`
}

type MySQLConfig struct {
	Host         string `mapstructure:"host"`
	User         string `mapstructure:"user"`
	Password     string `mapstructure:"password"`
	DbName       string `mapstructure:"dbname"`
	Port         int    `mapstructure:"port"`
	MaxOpenConns int    `mapstructure:"max_open_conns"`
	MaxIdleConns int    `mapstructure:"max_idle_conns"`
}

type RedisConfig struct {
	Host     string `mapstructure:"host"`
	Password string `mapstructure:"password"`
	Port     int    `mapstructure:"port"`
	DB       int    `mapstructure:"db"`
	PollSize int    `mapstructure:"pool_size"`
}

func Init() (err error) {
	viper.SetConfigName("config") // 指定配置文件名称
	viper.SetConfigType("yaml")   // 指定配置文件类型
	viper.AddConfigPath("./conf") // 指定
	err = viper.ReadInConfig()    // 读取配置信息
	if err != nil {
		fmt.Printf("viper read error:%v\n", err)
		return
	}

	// 把读取到的配置信息反序列化到 conf 变量中
	if err = viper.Unmarshal(Conf); err != nil {
		fmt.Printf("viper Unmarshal error:%v\n", err)
	}

	viper.WatchConfig()

	viper.OnConfigChange(func(in fsnotify.Event) {
		fmt.Println("配置修改成功", in.String())
		if err = viper.Unmarshal(Conf); err != nil {
			fmt.Printf("viper Unmarshal2 error:%v\n", err)
		}
	})

	return
}
