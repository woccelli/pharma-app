const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.shortdescription = !isEmpty(data.shortdescription) ? data.shortdescription : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Veuillez renseigner un nom de fiche";
    }

    // Shortdescription checks
    if (Validator.isEmpty(data.shortdescription)) {
        errors.shortdescription = "Veuillez renseigner une description courte";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};