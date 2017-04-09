const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

module.exports = function(passport) {
  router.post('/login', passport.authenticate('login'), function(req, res) {
    res.json(req.user);
  });

  router.post('/register', passport.authenticate('register'), function(req, res) {
    console.log(req.user);
    res.json(req.user);
  })

  return router;
}
