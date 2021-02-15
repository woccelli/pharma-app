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
const validateAddInput = require("../../validation/add")
const { validateUpdateNameInput, validateUpdateEmailInput, validateAddressInput, validateForgotPasswordInput, validateResetPasswordInput, validateSubInput, validateUpdatePasswordInput,validateUpdateHeaderAddressInput } = require("../../validation/update");

// Load models
const User = require("../../models/User");
const Log = require("../../models/Log");
const Sheet = require("../../models/Sheet")
const { sendEmailReset, sendEmailAddUser, sendEmailRegisterUser, sendEmailSubUser, sendEmailUpdateEmail, sendEmailDeleteUser } = require("../../email/mailer");
const mongoose = require('mongoose')
const { Mongoose } = require("mongoose");


// @route GET api/users/all
// @desc get all existing users
// @access Protected - admin only
router.get('/all', passport.authenticate('admin', { session: false }), (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/users/user
// @desc get a user name by Id
// @access Public
router.get('/user', (req, res) => {
    const { userId } = req.query
    User.findById(userId)
    .then(user => {
        res.send({ name: user.name})
    })
    .catch(err => console.log(err))
})

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
                        .then(user => {
                            sendEmailRegisterUser(user)
                            res.json(user)
                        }) // Return added user
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
                signUserJwtToken(user, res)
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Mot de passe incorrect" });
            }
        });
    });
});

// @route POST api/users/add
// @desc Add a user 
// @access Protected - admin only
router.post("/add", passport.authenticate('admin', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateAddInput(req.body);
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
                password: Date.now().toString()
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            // Send email to user for password initialization
                            const token = makeTokenFromPwd(user, 3600 * 24 * 2)//48hour
                            const url = getPasswordResetURL(user, token)
                            sendEmailAddUser(user, url)
                                .then(() => {
                                    return res.json(user)
                                })
                                .catch(err => console.log(err));
                        }) // Return added user
                        .catch(err => console.log(err));
                });
            });
        }
    })
})

// @route POST api/users/update
// @desc Update user - Send new token
// @access Protected - user only
router.post("/update-name", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateUpdateNameInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const name = req.body.name;

    User.findByIdAndUpdate(user._id, { name: name }, { useFindAndModify: false, new: true }, (err, result) => {
        if (result) {
            // result = updated user
            signUserJwtToken(result, res)
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
    if (user.email === email) {
        signUserJwtToken(user, res)
    } else {

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
                        if (result) {
                            sendEmailUpdateEmail(user, result)
                            signUserJwtToken(result, res)
                        }
                        if (err) {
                            return res.status(400).json(err);
                        }
                    })
                }
            })
    }
});

// @route POST api/users/update
// @desc Update user - Send new token
// @access Protected - user only
router.post("/update-address", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateAddressInput(req.body.address);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const { address } = req.body;
    User.findOneAndUpdate({ _id: user._id, addresses: { $elemMatch: { _id: address._id } } }, { $set: { 'addresses.$': address } }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        if (result) {
            signUserJwtToken(result, res)
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});

// @route POST api/users/user-subscription
// @desc Update user subscription date - Send new token
// @access Protected - admin only
router.post("/user-subscription", passport.authenticate('admin', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateSubInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { userId, subuntil } = req.body;

    User.findByIdAndUpdate(userId, { subuntil: subuntil }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        if (result) {
            sendEmailSubUser(result)
            res.send(result)
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});

// @route POST api/users/add-address
// @desc Add an address to the user's addresses list - Send new token
// @access Protected
router.post("/add-address", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateAddressInput(req.body.address);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const { address } = req.body;
    User.findByIdAndUpdate(user._id, { $push: { addresses: address } }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        if (result) {
            signUserJwtToken(result, res)
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});


// @route POST api/users/add-address
// @desc Add an address to the user's addresses list - Send new token
// @access Protected
router.post("/delete-address", passport.authenticate('user', { session: false }), (req, res) => {
    const user = req.user;
    const addressToDelete = req.body.address;
    User.findByIdAndUpdate(user._id, { $pull: { addresses: addressToDelete } }, { useFindAndModify: false, new: true }, (err, result) => {
        // result = updated user
        if (result) {
            signUserJwtToken(result, res)
        }
        if (err) {
            return res.status(400).json(err);
        }
    })
});

router.post("/update-password", passport.authenticate('user', { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateUpdatePasswordInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const password = req.body.password;
    const newPassword = req.body.newPassword1
    // Check password
    bcrypt.compare(password, req.user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    if (err) throw err;
                    User.findByIdAndUpdate(req.user._id, { password: hash }, { useFindAndModify: false, new: true }, (err, result) => {
                        // result = updated user
                        if (result) {
                            signUserJwtToken(result, res)
                        }
                        if (err) {
                            return res.status(400).json(err);
                        }
                    })
                });
            })
        } else {
            return res
                .status(400)
                .json({ password: "Mot de passe incorrect" });
        }
    });
});


router.post('/forgot-password', (req, res) => {
    // Form validation
    const { errors, isValid } = validateForgotPasswordInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                // Another user exists with the same email address
                return res.status(400).json({ email: "Cet e-mail n'existe pas" })
            }
            const token = makeTokenFromPwd(user, 3600) //1hour
            const url = getPasswordResetURL(user, token)
            sendEmailReset(user, url).then(() => {
                return res.json({
                    emailsent: true
                })
            })
        })
})

router.post('/password-reset', (req, res) => {

    // Form validation
    const { errors, isValid } = validateResetPasswordInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { userId, token } = req.query
    const password = req.body.newPassword1

    User.findById({ _id: userId }).then(user => {
        if (!user) {
            return res.status(400).json({ newPassword1: "Utilisateur invalide" })
        }
        const payload = decodeTokenFromPwd(token, user.password)
        if (payload._id.localeCompare(user._id) === 0) {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    User.findOneAndUpdate({ _id: userId }, { password: hash }, { useFindAndModify: false })
                        .then(() => res.status(202).json("Password change accepted"))
                        .catch(err => res.status(500).json(err))
                });
            });
        }
    })
})

router.post('/update-header-address', passport.authenticate('user', { session: false }), (req, res) => { 
    // Form validation
    const { errors, isValid } = validateUpdateHeaderAddressInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = req.user;
    const headerAddress = req.body.headerAddress;

    User.findByIdAndUpdate(user._id, { headerAddress: headerAddress }, { useFindAndModify: false, new: true }, (err, result) => {
        if (result) {
            // result = updated user
            signUserJwtToken(result, res)
        }
        if (err) {
            console.log(err)
            return res.status(400).json(err);
        }
    })
})

// @route GET api/users/all
// @desc get all existing users
// @access Protected - admin only
router.get('/check-token-validity', passport.authenticate('check-token', { session: false }), (req, res) => {
    if (new Date(req.user.dbUser.subuntil).getTime() !== new Date(req.user.jwtUser.subuntil).getTime()) {
        signUserJwtToken(req.user.dbUser, res)
    } else {
        res.sendStatus(200)
    }
});

router.post('/delete-user', passport.authenticate('user', { session: false}), (req, res) => {
    User.findByIdAndDelete(req.user._id, (err, res) => {
        if(err) {
            console.log(err)
        }
    }).then(deletedUser => {
        sendEmailDeleteUser(deletedUser)
        res.send(deletedUser)
    })
})

// @route GET api/users/logs
// @desc get logs of user
// @access Protected - admin only
router.get('/logs', passport.authenticate('admin', { session: false }), async (req, res) => {
    const docs = await Log.aggregate([
        { $match: { _user: mongoose.Types.ObjectId(req.query.userId) } },
        {
            $lookup: {
                from: "sheets", localField: "_sheet", foreignField: "_id", as: "sheetDetails"
            }
        }, {
            $unwind: "$sheetDetails"
        }, {
            $project: {
                "_id": 1,
                "_sheet": 1,
                "name": "$sheetDetails.name",
                "_user": 1,
                "date": 1
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    day: { $dayOfMonth: "$date" },
                    _sheet: { _id: "$_sheet", name: "$name" }
                },
                count: {
                    $sum: 1
                }
            },
        }, {
            $group: {
                _id: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day"
                },
                sheetCount: {
                    $push: {
                        _sheet: "$_id._sheet",
                        count: "$count"
                    }
                }
            }
        }
    ])
    res.send(docs)
});

const getPasswordResetURL = (user, token) => {
    return `http://localhost:3000/password-reset/${user._id}/${token}`
}

const getUserSecret = password => {
    return password + keys.secretOrKey
}

const makeTokenFromPwd = ({ _id, password }, expIn) => {
    console.log(_id, password, expIn)
    const secret = getUserSecret(password)
    const token = jwt.sign({ _id }, secret, {
        expiresIn: expIn
    })
    return token
}

const decodeTokenFromPwd = (token, password) => {
    const secret = getUserSecret(password)
    return jwt.decode(token, secret)
}

const signUserJwtToken = (user, res) => {
    // Create JWT Payload
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        headerAddress: user.headerAddress,
        role: user.role,
        subuntil: user.subuntil
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
};

module.exports = router;