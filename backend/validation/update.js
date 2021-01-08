const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {

    validateUpdateNameInput: function (data) {
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

    validateAddressInput: function (data) {
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
    },
    validateForgotPasswordInput:  function (data) {
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
    validateResetPasswordInput: function(data) {
        let errors = {};

        // Convert empty fields to an empty string so we can use validator functions
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
        // Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "Veuillez renseigner un mot de passe";
        }
        if (Validator.isEmpty(data.password2)) {
            errors.password2 = "Veuillez confirmer votre mot de passe";
        }
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Le mot de passe doit faire au moins 6 caractères";
        }
        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Les mots de passe doivent correspondre";
        }
    
        return {
            errors,
            isValid: isEmpty(errors)
        };
    },
    validateSubInput: function(data) {
        let errors = {};

        // Convert empty fields to an empty string so we can use validator functions
        data.subuntil = !isEmpty(data.subuntil) ? data.subuntil : "";
        data.userId = !isEmpty(data.userId) ? data.userId : "";

         // Password checks
         if (Validator.isEmpty(data.subuntil)) {
            errors.subuntil = "Veuillez renseigner une date";
        }
        if (Validator.isEmpty(data.userId)) {
            errors.userId = "Veuillez renseigner l'utilisateur";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }

}