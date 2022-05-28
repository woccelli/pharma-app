const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.commandNumber = !isEmpty(data.commandNumber) ? data.commandNumber : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Veuillez saisir une dénomination sociale";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Veuillez renseigner une adresse e-mail";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "L'adresse e-mail renseignée est invalide";
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