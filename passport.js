var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
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
        User.findOne({username:username,password:password},function(err,user){
            if(!user){return done(null, false);}
            return done(null,user);
        })
    }))

}
module.exports.AUpassport = AUpassport;