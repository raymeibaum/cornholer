const mongoose = require('mongoose');

const User = require('../models/user');
const Game = require('../models/game');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

mongoose.promise = global.Promise;

User.remove({}, function(err) {
    console.log(err);
});

Game.remove({}, function(err) {
  console.log(err)
});

var game1 = new Game({
  users: ['ray', 'dee', 'brandon', 'julian'],
  winner: {
      users: ['ray', 'julian' ],
      score: 11
  },
  loser: {
    users: ['dee', 'brandon'],
    score: 2
  }
});

game1.save(function(err){
   if(err) console.log(err);

   console.log('Game created!')
 });


 mongoose.connection.close();
