package mysql

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"fmt"
	"gin/models"
)

func CheckUserExist(username string) (bool, error) {
	sqlStr := `select count(*) from golang_user where username=?`
	var count int
	if err := db.Get(&count, sqlStr, username); err != nil {
		return false, nil
	}
	return count > 0, nil
}

// InsertUser 数据插入
func InsertUser(user *models.User) (err error) {
	sqlStr := `insert into golang_user(user_id,username,password) values(?,?,?)`
	_, err = db.Exec(sqlStr, user.UserID, user.Username, encryptPassword(user.Password))
	fmt.Println(777, err)
	return
}

func encryptPassword(oPassword string) string {
	h := md5.New()
	h.Write([]byte("dddddd"))
	return hex.EncodeToString(h.Sum([]byte(oPassword)))
}

func Login(user *models.User) (err error) {
	password := encryptPassword(user.Password)
	sqlStr := `select user_id,username,password from golang_user where username=?`

	if err = db.Get(user, sqlStr, user.Username); err != nil {
		return err
	}
	if password != user.Password {
		return errors.New("用户名或密码错误")
	}

	return
}
