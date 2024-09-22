package validate

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func Struct(s interface{}) error {
	return validate.Struct(s)
}

func usernameValidator(fl validator.FieldLevel) bool {
	regex := regexp.MustCompile("^[a-zA-Z0-9._]+$")
	return regex.MatchString(fl.Field().String())
}

func init() {
	validate = validator.New()
	validate.RegisterValidation("username_valid", usernameValidator)
}
