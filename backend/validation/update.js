const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {

    validateUpdateInput: function (data) {
        let errors = {};

        // Convert empty fields to an empty string so we can use validator functions
        data.name = !isEmpty(data.name) ? data.name : "";

        // Name checks
        if (Validator.isEmpty(data.name)) {
            errors.name = "Veuillez renseigner le nom de l'enseigne";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    },

    validateUpdateEmailInput: function (data) {
        let errors = {};

        // Convert empty fields to an empty string so we can use validator functions
        data.email = !isEmpty(data.email) ? data.email : "";

        // Email checks
        if (Validator.isEmpty(data.email)) {
            errors.email = "Veuillez renseigner une adresse e-mail";
        } else if (!Validator.isEmail(data.email)) {
            errors.email = "Veuillez renseigner une adresse e-mail valide";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }

}