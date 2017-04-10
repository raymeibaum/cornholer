const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

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
      return done(null, false);
    }
    User.findOne({ username: username })
      .exec(function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message: 'A user exists with that username.' });
        } else {
          const createdPasswordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
  ));
}
