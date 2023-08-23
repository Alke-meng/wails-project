package logic

import (
	"gin/models"
	"gin/pkg/jwt"
	"gin/pkg/snowflake"
)

func Login(p *models.ParamLogin) (token string, err error) {
	u := &models.User{
		Username: p.Username,
		Password: p.Password,
	}

	userID := snowflake.GenID()

	return jwt.GenToken(userID, u.Username)
}
