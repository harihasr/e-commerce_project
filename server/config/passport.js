'use strict';
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('../app/db');
var config = require('../config/main');


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    passport.serializeUser(function (user,done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (id, done) {
        db.findUserById(id, function (err, user) {
            done(err, user);
        });
    });

    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        db.findUser({email_id: jwt_payload.email_id}, function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));

};
