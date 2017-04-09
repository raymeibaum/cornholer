const express = require('express');
const router = express.Router({mergeParams: true});

const User = require('../models/user.js');

// router.get('/', function userShow(req, res) {
//   User.findOne({username: req.params.username})
//     .then(function returnUser(user) {
//       res.json(user);
//     });
// });


// Get
router.get('/', function indexAction(request, response) {
  User.find(function(error, users) {
    if(error) response.json({message: 'Could not find any users'});

    response.json({users: users});
  }).select('-__v');
});




// // Show
router.get('/:id', function showAction(request, response) {
  var id = request.params.id;

  User.findById({_id: id}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json({user: user});
  }).select('-__v');
});




module.exports = router;
