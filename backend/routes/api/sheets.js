const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const path = require("path");

// Load Sheet model
const Sheet = require("../../models/Sheet");

// Load input validation
const validateAddInput = require("../../validation/sheet");
const passport = require("passport");

router.get('/', function (req, res) {
    Sheet.find()
        .then(sheets => res.json(sheets))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/sheets/add
// @desc add sheet
// @access protected
router.post("/add", passport.authenticate('admin', { session: false }), (req, res) => {
    //verify the JWT token generated for the user
    // Form validation

    const { errors, isValid } = validateAddInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Sheet.findOne({ name: req.body.name }).then(sheet => {
        if (sheet) {
            return res.status(400).json({ name: "Cette fiche existe déjà" });
        } else {
            const newSheet = new Sheet({
                name: req.body.name,
                shortdescription: req.body.shortdescription,
                synonyms: req.body.synonyms,
                description: req.body.description
            });
            newSheet
                .save()
                .then(sheet => res.json(sheet))
                .catch(err => console.log(err));
        }
    });
});

module.exports = router;