angular
  .module('project3')
  .service('SocketService', SocketService);

SocketService.$inject = ['$rootScope'];

function SocketService($rootScope) {
  const self = this;
  const socket = io();

  self.adjustScore = adjustScore;
  self.getScore = getScore;
  self.clearScore = clearScore

  socket.on('current-score', receiveScores)

  function receiveScores(scores) {
    $rootScope.scores = scores;
    $rootScope.$apply();
  };

  function adjustScore(adjustment) {
    socket.emit('adjust-score', adjustment);
  }
  function clearScore() {
    socket.emit('clear-score');
  }
  function getScore() {
    socket.emit('get-score');
  }
}
