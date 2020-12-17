const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Authentication and authorization
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { validateUpdateInput, validateUpdateEmailInput, validateAddAddressInput } = require("../../validation/update");

// Load User model
const User = require("../../models/User");

// @route GET api/users/all
// @desc get all existing users
// @access Protected - admin only
router.get('/all', passport.authenticate('admin', { session: false }), (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // User already exists
            return res.status(400).json({ email: "Cette adresse e-mail existe déjà" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user)) // Return added user
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token (valid 1 year)
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "E-mail introuvable" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    addresses: user.addresses,
                    role: user.role,
                    subscriber: user.subscriber
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Mot de passe incorrect" });
            }
        });
    });
});

// @route POST api/users/update
// @desc Update user - Send new token
// @access Protected - user only
router.post("/update", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateUpdateInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const name = req.body.name;

    User.findByIdAndUpdate(user._id, { name: name }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        const payload = {
            id: result.id,
            name: result.name,
            email: result.email,
            addresses: result.addresses,
            role: result.role,
            subscriber: result.subscriber
        };

        if (result) {
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});

// @route POST api/users/update-email
// @desc Update user email - Send new token - Error if email already exists in DB
// @access Protected - user only
router.post("/update-email", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateUpdateEmailInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const email = req.body.email;

    User.findOne({ email })
        .then(existinguser => {
            if (existinguser) {
                // Another user exists with the same email address
                return res.status(400).json({ email: "Cet e-mail n'est pas disponible" })
            }
            else {
                // The email address is free
                User.findByIdAndUpdate(user._id, { email: email }, { useFindAndModify: false, new: true }, (err, result) => {
                    // result = updated user
                    const payload = {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        addresses: result.addresses,
                        role: result.role,
                        subscriber: result.subscriber
                    };
                    
                    if (result) {
                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    }
                    if (err) {
                        return res.status(400).json(err);
                    }
                })
            }
        })
});

// @route POST api/users/add-address
// @desc Add an address to the user's addresses list - Send new token
// @access Protected
router.post("/add-address", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateAddAddressInput(req.body.address);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const newAddress = req.body.address;

    User.findByIdAndUpdate(user._id, { $push: {addresses: newAddress} }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        const payload = {
            id: result.id,
            name: result.name,
            email: result.email,
            addresses: result.addresses,
            role: result.role,
            subscriber: result.subscriber
        };
        
        if (result) {
            // Sign token
            console.log(result)
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});

module.exports = router;