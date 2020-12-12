const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const path = require("path");

// Load Sheet model
const Sheet = require("../../models/Sheet");

// Load input validation
const {validateAddInput, validateSendInput} = require("../../validation/sheet");
const passport = require("passport");

//Email sending
const sendEmail = require("../../email/mailer");

// @route GET api/sheets/
// @desc get all existing sheets
// @access public
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
                definition: req.body.definition,
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

// @route POST api/sheets/send
// @desc send sheet
// @access protected
router.post("/send", passport.authenticate('subscriber', { session: false }), (req, res) => {
    console.log('recu : ', req.body)
    //verify the JWT token generated for the user
    // Form validation
    const { errors, isValid } = validateSendInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Sheet.findOne({ name: req.body.name }).then(sheet => {
        if (sheet) {
            sendEmail(req.body)
                .then(() => {
                    return res.json({
                        emailsent: true
                    })
                })
                .catch(() => {
                    return res.status(400).json(
                        {
                            sendtoemail: "Une erreur s'est produite lors de l'envoi",
                            emailsent: false
                        }
                    )
                })
        } else {
            return res.status(400).json({ name: "La fiche demandée n'existe pas", emailsent: false });
        }
    });
});

module.exports = router;