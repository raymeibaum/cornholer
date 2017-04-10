const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');

router.get('/:username', function userShow(req, res) {
  User.findOne({username: req.params.username})
    .exec(function returnUser(err, user) {
      if (err) {
        res.json(err);
      } else {
        res.json(user);
      }
    })
});

router.get('/', function indexAction(req, res) {
  User.find({})
    .exec(function returnAllUsers(err, users) {
      if (err) {
        res.json({message: 'Could not find any users'})
      } else {
        res.json({users: users})
      }
    })
});

module.exports = router;
