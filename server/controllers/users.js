const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');

router.get('/', function userShow(req, res) {
  User.findOne({username: req.params.username})
    .then(function returnUser(user) {
      res.json(user);
    });
});

module.exports = router;
