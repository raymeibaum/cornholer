const mongoose = require('mongoose');

const User = require('../models/user');
const Game = require('../models/game');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

mongoose.promise = global.Promise;

User.remove({}, function(err) {
    console.log(err);
});

var user1 = new User({
  username: 'toddbundy',
  passwordDigest: '84en98cb39b92',
  telephone: 4048372883

});

var game1 = new Game({
  winner: {
      users: ['toddbundy', 'Jerry' ],
      score: 11
  },
  loser: {
    users: ['Ben', 'Chuck'],
    score: 2
  }
});

user1.games.push(game1);

user1.save(function(err){
   if(err) console.log(err);

   console.log('User created!')
 });


 mongoose.connection.close();
