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
      console.log(scores);
      io.emit('current-score', scores);
    });

    socket.on('get-score', function() {
      console.log(scores);
      io.emit('current-score', scores)
    });

    socket.on('clear-score', function() {
    scores.red = 0;
    scores.black = 0;
    io.emit('current-score', scores);
  });

  });
}
