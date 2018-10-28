"use strict";
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const fs = require("fs");
var AUpassport = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local', new LocalStrategy(function(username, password, done){
        User.findOne({username:username,password:password,estado:{ $gte: 1.0 }},function(err,user){
            if(!user){
                let E_fecha = new Date();
                fs.appendFileSync("LOG/auth.txt",E_fecha+" Error de authenticacion\n")
                return done(null, false);
            }
            let E_fecha = new Date();
            fs.appendFileSync("LOG/auth.txt",E_fecha+" Authenticacion Correcta\n")
            return done(null,user);
        })
    }))

}
module.exports.AUpassport = AUpassport;