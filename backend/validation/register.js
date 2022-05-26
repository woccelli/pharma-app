const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.commandNumber = !isEmpty(data.commandNumber) ? data.commandNumber : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Veuillez renseigner le nom de l'enseigne";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Veuillez renseigner une adresse e-mail";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Veuillez renseigner une adresse e-mail valide";
    }

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

    // Command number check
    if (Validator.isEmpty(data.commandNumber)) {
        errors.commandNumber = "Veuillez renseigner un numéro de commande valide"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};