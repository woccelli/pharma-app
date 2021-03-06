const express = require("express");
const router = express.Router();

// Load models
const Log = require('../../models/Log');
const Sheet = require("../../models/Sheet");
const mongoose = require('mongoose');

// Load input validation
const { validateAddInput, validateSendInput, validateDeleteInput,validateUpdateInput } = require("../../validation/sheet");

// Authentication and authorization 
const passport = require("passport");

// Email sending
const { sendSheetEmail }  = require("../../email/mailer");

/* 
    -- UTIL FUNCTIONS -- 
*/
// Create the Sheet Object that will be inserted in the Sheet DB Model
function createSheet(data) {
    const newSheet = {
        name: data.name,
        definition: data.definition,
        sections: data.sections,
        advices: data.advices,
    };
    return newSheet;
}
// Save a log in the DB
function addLog(sheet, user){
    const log = new Log({
        _sheet: sheet._id,
        _user: user._id
    });
    log.save();
}

/* 
    -- ROUTES -- 
*/

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
// @access protected - admin only
router.post("/add", passport.authenticate('admin', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateAddInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Sheet.findOne({ name: req.body.name }).then(sheet => {
        if (sheet) {
            // Sheet already exists
            return res.status(400).json({ name: "Cette fiche existe déjà" });
        } else {
            newSheet = new Sheet(createSheet(req.body))
            newSheet
                .save()
                .then(sheet => res.json(sheet)) // return added sheet
                .catch(err => console.log(err));
        }
    });
});

// @route POST api/sheets/update
// @desc update sheet
// @access protected - admin only
router.post("/update", passport.authenticate('admin', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateUpdateInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newSheet = createSheet(req.body);
    Sheet.findByIdAndUpdate(req.body._id, newSheet, { useFindAndModify: false, new: true }, (err, result) => {
        if (result) {
            // result = updated sheet
            res.send(result._id);
        }
        if (err) {
            return res.status(400).json(err);
        }
    } )
});

// @route POST api/sheets/delete
// @desc delete sheet
// @access protected - admin only
router.post("/delete", passport.authenticate('admin', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateDeleteInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Sheet.findByIdAndDelete(req.body._id, { useFindAndModify: false }, (err, result) => {
        if (result) {
            // result = updated sheet
            res.send(result._id);
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});



// @route POST api/sheets/send
// @desc send sheet
// @access protected - subscribed users only
router.post("/send", passport.authenticate('subscriber', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateSendInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Sheet.findOne({ name: req.body.name }).then(sheet => {
        if (sheet) {
            sendSheetEmail(req.body, req.user)
                .then(() => {
                    addLog(sheet, req.user);
                    return res.json({
                        emailsent: true
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json(
                        {
                            sendtoemail: "Une erreur s'est produite lors de l'envoi",
                            emailsent: false
                        }
                    );
                });
        } else {
            // Sheet doesn't exist in DB
            return res.status(400).json({ name: "La fiche demandée n'existe pas", emailsent: false });
        }
    });
});

// @route GET api/sheets/logs
// @desc get number of logs of a specific sheet - group by day
// @access Protected - admin only
router.get('/logs',  async (req, res) => {
    const docs = await Log.aggregate([
        { 
            $match: { _sheet: mongoose.Types.ObjectId(req.query.sheetId) } 
        },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    day: { $dayOfMonth: "$date" },
                },
                count: {
                    $sum: 1
                }
            },
        }
    ]);
    res.send(docs);
});

module.exports = router;