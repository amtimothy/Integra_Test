package controllers

import (
	"user-service/data"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

type Config struct {
	Repo data.IRepository
}

func (app *Config) NewServer() *echo.Echo {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.POST, echo.DELETE},
		AllowHeaders: []string{"Accept", "Authorization", "Content-Type"},
		MaxAge:       300,
	}))

	e.GET("/users", app.getAllUsers)
	e.GET("/users/:id", app.getUser)
	e.POST("/users", app.saveUser)
	e.POST("/users/:id", app.updateUser)
	e.DELETE("/users/:id", app.deleteUser)

	return e
}
