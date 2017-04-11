angular
  .module('project3')
  .service('SocketService', SocketService);

SocketService.$inject = ['$rootScope'];

function SocketService($rootScope) {
  const self = this;
  const socket = io();

  self.adjustScore = adjustScore;
  self.getScore = getScore;
  self.getList = getList;
  self.clearScore = clearScore;
  self.addToList = addToList;

  socket.on('current-score', receiveScores);
  socket.on('current-list', receiveList);

  function adjustScore(adjustment) {
    socket.emit('adjust-score', adjustment);
  }
  function clearScore() {
    socket.emit('clear-score');
  }
  function getScore() {
    socket.emit('get-score');
  }
  function getList() {
    socket.emit('get-list')
  }
  function addToList(newTeam) {
    socket.emit('signup', newTeam);
  }
  function receiveList(signupList) {
    $rootScope.signupList = signupList;
    $rootScope.$apply();
  }
  function receiveScores(scores) {
    $rootScope.scores = scores;
    $rootScope.$apply();
  };
}
