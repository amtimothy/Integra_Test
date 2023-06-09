package controllers_test

import (
	"testing"
	"user-service/controllers"
	"user-service/data"

	"github.com/DATA-DOG/go-sqlmock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestControllers(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Controllers Suite")
}

func newTestApp() (
	controllers.Config, sqlmock.Sqlmock,
) {
	conn, mockDB, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
	Expect(err).Should(BeNil())

	app := controllers.Config{
		Repo: data.NewRepository(conn),
	}

	return app, mockDB
}
