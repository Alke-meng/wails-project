package mysql

import (
	"database/sql"
	"fmt"
	"gin/settings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

var db *sqlx.DB

func Init(cfg *settings.MySQLConfig) (err error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True",
		cfg.User,
		cfg.Password,
		cfg.Host,
		cfg.Port,
		cfg.DbName,
	)

	db, err = sqlx.Connect("mysql", dsn)
	if err != nil {
		fmt.Println("connect db failed, err: ", zap.Error(err))
		return
	}

	db.SetMaxOpenConns(viper.GetInt("mysql.max_open_conns"))
	db.SetMaxIdleConns(viper.GetInt("mysql.max_idle_conns"))
	db.SetConnMaxLifetime(viper.GetDuration("mysql.max_life_time"))
	return

}

func GetResultRowsForMap(rows *sql.Rows) (dataMaps []map[string]interface{}, err error) {
	// 1. 查询到的数据列名、返回值
	columns, _ := rows.Columns() //列名
	count := len(columns)
	values, valuesPoints := make([]interface{}, count), make([]interface{}, count)

	// 2. 遍历Rows读取每一行
	for rows.Next() {
		for i := 0; i < count; i++ {
			valuesPoints[i] = &values[i]
		}

		// 2.1 数据库中读取出每一行数据
		rows.Scan(valuesPoints...) //将所有内容读取进values

		// 2.2 相当于准备接收数据的结构体Product
		row := make(map[string]interface{})

		// 2.3 将读取到的数据填充到product
		for i, val := range values { // val是每个列对应的值
			key := columns[i] //列名

			// 判断val的值的类型
			var v interface{}
			b, ok := val.([]byte) //判断是否为[]byte
			if ok {
				v = string(b)
			} else {
				v = val
			}

			// 列名与值对应
			row[key] = v
		}

		// 将product归到集合中
		dataMaps = append(dataMaps, row)
	}
	return dataMaps, nil
}

func GetResultRowsForArray(rows *sql.Rows) (dataMaps [][]interface{}, err error) {
	// 1. 查询到的数据列名、返回值
	columns, _ := rows.Columns() //列名
	count := len(columns)
	values, valuesPoints := make([]interface{}, count), make([]interface{}, count)

	// 2. 遍历Rows读取每一行
	for rows.Next() {
		for i := 0; i < count; i++ {
			valuesPoints[i] = &values[i]
		}

		// 2.1 数据库中读取出每一行数据
		rows.Scan(valuesPoints...) //将所有内容读取进values

		// 2.2 相当于准备接收数据的结构体Product
		var row []interface{}

		// 2.3 将读取到的数据填充到product
		for _, val := range values { // val是每个列对应的值
			// 判断val的值的类型
			var v interface{}
			b, ok := val.([]byte) //判断是否为[]byte
			if ok {
				v = string(b)
			} else {
				v = val
			}

			// 列名与值对应
			row = append(row, v)
		}

		// 将product归到集合中
		dataMaps = append(dataMaps, row)
	}
	return dataMaps, nil
}

func ExecSqlDetail(sql string) (r interface{}) {
	tx, err := db.Beginx()
	if err != nil {
		return fmt.Sprintf("beginx failed, err:%v\n", err)
	}

	//使用事务对象tx, 执行事务
	if _, err := tx.Exec(`Set optimizer_trace="enabled=on"`); err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec SET trace failed, err:%v\n", err)
	}

	if _, err := tx.Exec(`SET profiling = 1;`); err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec SET profiling failed, err:%v\n", err)
	}

	rows1, err := tx.Query(sql)
	if err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec sql failed, err:%v\n", err)
	}
	rows1.Close()

	rows2, err := tx.Query("SHOW PROFILE cpu, source FOR QUERY 1;")
	if err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec profile detail failed, err:%v\n", err)
	}
	tmp2, err := GetResultRowsForArray(rows2)
	if err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec profile detail failed, err:%v\n", err)
	}
	rows2.Close()

	rows3, err := tx.Query("SELECT TRACE FROM information_schema.OPTIMIZER_TRACE;")
	if err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec select trace detail failed, err:%v\n", err)
	}
	tmp3, err := GetResultRowsForArray(rows3)
	if err != nil {
		tx.Rollback()
		return fmt.Sprintf("exec select trace detail failed, err:%v\n", err)
	}
	rows3.Close()

	tx.Commit()

	data := map[string]any{
		"detail":  tmp2,
		"explain": tmp3,
	}

	return data
}

func Close() {
	_ = db.Close()

}
