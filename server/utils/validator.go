package utils

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

var Validate *validator.Validate

func usernameValidator(fl validator.FieldLevel) bool {
	regex := regexp.MustCompile("^[a-zA-Z0-9._]+$")
	return regex.MatchString(fl.Field().String())
}

func init() {
	Validate = validator.New()
	Validate.RegisterValidation("username_valid", usernameValidator)
}
