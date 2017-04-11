const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const salt = '$2a$10$cih4zB2S.IGxyxopWFUB2e';

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

router.patch('/:username', function updateAction(req, res) {

  User.findOne({username: req.params.username}, function(error, user) {
    if(error) res.json({message: 'Could not find user b/c:' + error});

    if(req.body.username) user.username = req.body.username;
    if (req.body.password) { user.passwordDigest = bcrypt.hashSync(req.body.password, salt); }
    if(req.body.telephone) user.telephone = req.body.telephone;

    user.save(function(error) {
      console.log(user)
      if(error) res.json({messsage: 'Could not update user b/c:' + error});

      res.json({message: 'User successfully updated', user: user});
    });
  }).select('-__v');
});

router.delete('/:username', function destroyAction(request, response) {

  User.remove({username: request.params.username}, function(error) {
    if(error) response.json({message: 'Could not delete user b/c:' + error});

    response.json({message: 'User successfully deleted'});
  }).select('-__v');
});





module.exports = router;
