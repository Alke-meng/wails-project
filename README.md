# 欢迎使用 wails-project

**一款后端go语言，前端采用vue3、element plus，利用 wails 构建的 redis、mysql、nginx 简易工具；项目分为两部分：window 桌面前端 和 liunx 后端**

### 开发环境

> go v1.18.1
> 
> node v16.18.1
> 
> wails v2.4.1 
> 
>温馨提示：运行该项目需要指定【wails】版本，go install github.com/wailsapp/wails/v2/cmd/wails@v2.4.1

进入win文件夹：`cd win-desk`

执行命令：`wails dev` 启动开发模式

编译命令：`wails build -clean  -ldflags "-w -s -H windowsgui"  -o aite.exe`

编译exe文件地址：`win-desk/build/bin` (也可下载已编译好的 aite.exe)

wails 具体使用请参考官网 https://wails.io/

### window 桌面前端

> 开发桌面

进入win文件夹：`cd win-desk`

执行命令：`wails dev` 启动开发模式

编译命令：`wails build -clean  -ldflags "-w -s -H windowsgui"  -o aite.exe` 

编译exe文件地址：`win-desk/build/bin` (也可下载已编译好的 aite.exe)

wails 具体使用请参考官网 https://wails.io/

**特别注意**

win-desk/service/script/City.mmdb 文件夹中离线IP解析数据源请自行更新，网址：https://dev.maxmind.com/geoip/geolite2-free-geolocation-data??lang=en

### liunx 后端

> 开发 liunx 后端

进入liunx文件夹：`cd liunx-back`

执行命令：`go run main.go --help`  获取帮助

执行启动：`go run main.go -p 8081 -d '{"name":"aite","pwd":"123"}'`  


编译命令：`go build -o aite main.go` 

执行启动：`./aite -p 8081 -d '{"name":"aite","pwd":"123"}'` 

**特别注意：配置文件中的数据库相关信息要修改**

`vi conf/config.yaml`

    mysql:
  		host: "127.0.0.1"
  		port: 3306
  		user: "root"              // 修改为自己的登录名
  		password: "123456"        // 修改为自己的登录密码
  		dbname: "test"            // 修改为自己的数据库名
  		max_open_conns: 10
  		max_idle_conns: 5
  		max_life_time: 1800

`vi pkg/soar/soar.yaml`

    # 线上环境配置
	online-dsn:
		addr: 127.0.0.1:3306
		schema: test              // 修改为自己的数据库名
		user: root                // 修改为自己的登录名
		password: 123456          // 修改为自己的登录密码
		disable: false
		
    # 测试环境配置
	test-dsn:
		addr: 127.0.0.1:3306
		schema: test              // 修改为自己的数据库名
		user: root                // 修改为自己的登录名
		password: 123456          // 修改为自己的登录密码
		disable: false

soar 具体使用请参考官网 https://github.com/XiaoMi/soar

### 极简安装

> windows 安装程序 setup.exe 引导安装桌面程序，默认安装目录 D:\AiteTool
>
> liunx tar 解压即可，需要自行修改 config.yaml、soar.yaml 配置文件中的相关信息
> 
> 命令：tar -xzvf aiteTool.tar.gz
> 
> 欢迎大家下载使用
>

---
### 项目图片演示

![image](https://github.com/Alke-meng/wails-project/blob/main/images/1.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/2.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/3.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/4.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/5.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/6.png)

![image](https://github.com/Alke-meng/wails-project/blob/main/images/7.png)

---
### 感谢以下开源
> Wails https://wails.io/

> Percona Toolkit https://docs.percona.com/percona-toolkit/pt-query-digest.html

> Soar https://github.com/XiaoMi/soar

> Nginx-log-analyzer https://github.com/fantasticmao/nginx-log-analyzer

> Redis-rdb https://github.com/sripathikrishnan/redis-rdb-tools

