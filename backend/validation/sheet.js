const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.definition = !isEmpty(data.definition) ? data.definition : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Veuillez renseigner un nom de fiche";
    }

    // Definition checks
    if (Validator.isEmpty(data.definition)) {
        errors.definition = "Veuillez renseigner une description courte";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = function validateSendInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.sendtoemail = !isEmpty(data.sendtoemail) ? data.sendtoemail : "";

    // Email checks
    if (Validator.isEmpty(data.sendtoemail)) {
        errors.sendtoemail = "Veuillez renseigner une adresse e-mail";
    } else if (!Validator.isEmail(data.sendtoemail)) {
        errors.sendtoemail = "Veuillez renseigner une adresse e-mail valide";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};