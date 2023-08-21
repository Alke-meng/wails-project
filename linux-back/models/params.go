package models

type ParamLogin struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type ParamQuerySql struct {
	Sql  string `json:"sql" binding:"required"`
	Type string `json:"type" binding:"required"`
}

type ParamExecSql struct {
	Sql string `json:"sql" binding:"required"`
}
