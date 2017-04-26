const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const salt = '$2a$10$cih4zB2S.IGxyxopWFUB2e';

module.exports = passportHelpers;

function passportHelpers(passport) {
  passport.serializeUser(function serializeUser(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function deserializeUser(id, done) {
    User.findById(id, function findById(err, user) {
      done(err, user);
    });
  });

  passport.use('register', new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
    if (req.body.password !== req.body.confirmPassword) {
      return done(null, false, {message: "Passwords don't match."});
    }
    User.findOne({ username: username })
      .exec(function gottaNameThings(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message: 'A user exists with that username.' });
        } else {
          const createdPasswordDigest = bcrypt.hashSync(password, salt);
          let newUser = new User({
            username: username,
            passwordDigest: createdPasswordDigest,
            telephone: req.body.telephone
          });
          newUser.save(function(err, user) {
            if (err) { return done(err); }
            return done(null, user);
          });
        }
      })
    }
  ));

  passport.use('login', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username })
      .exec(function(err, user) {
        if (err) { return done(err); }
        if (!user || !bcrypt.compareSync(password, user.passwordDigest)) {
          return done(null, false, {message: "Incorrect username or password."});
        } else {
          return done(null, user);
        }
      });
    }
  ));
}
