const List = require('../models/list.js')

module.exports = socketHelper;

const scores = {
  black: 0,
  red: 0
}

function socketHelper(io) {
  io.on('connection', function(socket){

    socket.on('adjust-score', function(adjustment) {
      switch (adjustment) {
        case 'black-plus' :
          scores.black++;
          break;
        case 'black-minus' :
          scores.black--;
          break;
        case 'red-plus' :
          scores.red++;
          break;
        case 'red-minus' :
          scores.red--;
          break;
      }
      io.emit('current-score', scores);
    });

    socket.on('get-score', function() {
      io.emit('current-score', scores)
    });
    socket.on('get-list', function() {
      List.find({})
        .exec(function(err, lists){
          io.emit('current-list', lists);
        })
    })

    socket.on('clear-score', function() {
      scores.red = 0;
      scores.black = 0;
      io.emit('current-score', scores);
    });

    socket.on('signup', function(newTeam) {
      console.log(newTeam);
      const list = new List({
        user1: {
          username: newTeam.user1.username,
          telephone: newTeam.user1.telephone
        },
        user2: {
          username: newTeam.user2.username,
          telephone: newTeam.user2.telephone
        }
      });
      list.save(function() {
        List.find({})
          .exec(function(err, lists){
            io.emit('current-list', lists);
          })
      })
    })

  });
}
