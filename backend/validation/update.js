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
    },

    validateAddAddressInput: function (data) {
        let errors = {};

        // Convert empty fields to an empty string so we can use validator functions
        data.dest = !isEmpty(data.dest) ? data.dest : "";
        data.addr_1 = !isEmpty(data.addr_1) ? data.addr_1 : "";
        data.postcode = !isEmpty(data.postcode) ? data.postcode : "";
        data.city = !isEmpty(data.city) ? data.city : "";
        data.country = !isEmpty(data.country) ? data.country : "";

        // Dest checks
        if (Validator.isEmpty(data.dest)) {
            errors.dest = "Veuillez renseigner un destinataire";
        }
        // Address_1 checks
        if (Validator.isEmpty(data.addr_1)) {
            errors.addr_1 = "Veuillez renseigner une adresse";
        }
        // Postcode checks
        if (Validator.isEmpty(data.postcode)) {
            errors.postcode = "Veuillez renseigner un code postal ou CEDEX";
        }
        // City checks
        if (Validator.isEmpty(data.city)) {
            errors.city = "Veuillez renseigner une ville";
        }
        // Country checks
        if (Validator.isEmpty(data.country)) {
            errors.country = "Veuillez renseigner un pays";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }

}