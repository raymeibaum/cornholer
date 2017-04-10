module.exports = socketHelper;

var blackScore = 0;
var redScore = 0;

function socketHelper(io) {
  io.on('connection', function(socket){
    console.log('connection established');
  });
}
