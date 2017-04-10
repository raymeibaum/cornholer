angular
  .module('project3')
  .service('SocketService', SocketService);

SocketService.$inject = ['$rootScope'];

function SocketService($rootScope) {
  const self = this;
  const socket = io();

  self.adjustScore = adjustScore;
  self.getScore = getScore;

  function adjustScore(adjustment) {
    socket.emit('adjust-score', adjustment);
  }
  function getScore() {
    socket.emit('get-score');
  }
}
