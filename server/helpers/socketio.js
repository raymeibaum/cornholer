const List = require('../models/list.js')

module.exports = socketHelper;

const scores = {
  black: 0,
  red: 0
};
const currentTeams = {
  black: {
    user1: 'ray',
    user2: 'ray'
  },
  red: {
    user1: 'ray',
    user2: 'ray'
  }
};

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

    socket.on('get-list', function() {
      List.find({})
        .exec(function(err, lists){
          io.emit('current-list', lists);
        });
    });
    socket.on('get-score', function() {
      io.emit('current-score', scores)
    });
    socket.on('get-teams', function() {
      io.emit('current-teams', currentTeams);
    });
    socket.on('clear-score', clearScores);

    socket.on('new-team', function(teamColor) {
      clearScores();
      switch (teamColor) {
        case 'black' :
        List.findOneAndRemove({})
          .exec(function(err, team) {
            if (team) {
              currentTeams.black.user1 = team.user1.username;
              currentTeams.black.user2 = team.user2.username;
              io.emit('current-teams', currentTeams);
              getAndSendList();
            }
          });
          break;
        case 'red' :
          List.findOneAndRemove({})
            .exec(function(err, team) {
              if (team) {
                currentTeams.red.user1 = team.user1.username;
                currentTeams.red.user2 = team.user2.username;
                io.emit('current-teams', currentTeams);
                getAndSendList();
              }
            });
          break;
      }

    });

    socket.on('signup', function(newTeam) {
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

  function clearScores() {
    scores.red = 0;
    scores.black = 0;
    io.emit('current-score', scores);
  };
  function getAndSendList() {
    List.find({})
      .exec(function(err, lists){
        io.emit('current-list', lists);
      });
  }
}
