const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");


//doc at http://www.passportjs.org/packages/passport-jwt/
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    //authorization for users routes
    passport.use(
        'user',
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    //authorization for admin routes
    passport.use(
        'admin',
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        if(user.role = 'ADMIN') {
                            return done(null, user);
                        }
                        return done(null, false);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    //authorization for subscribed users routes
    passport.use(
        'subscriber',
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        if((new Date(user.subuntil)) > Date.now()) {
                            return done(null, user);
                        }
                        return done(null, false);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    //return DB user and browser token of the user - is used to check if DB token != browser token
    passport.use(
        'check-token',
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, {dbUser: user, jwtUser :jwt_payload});
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};

