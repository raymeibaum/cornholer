angular
  .module('project3')
  .service('SocketService', SocketService);

SocketService.$inject = ['$rootScope'];

function SocketService($rootScope) {
  const self = this;
  const socket = io();

  self.addToList = addToList;
  self.adjustScore = adjustScore;
  self.clearScore = clearScore;
  self.getList = getList;
  self.getScore = getScore;
  self.getTeams = getTeams;
  self.nextTeam = nextTeam;

  socket.on('current-score', receiveScores);
  socket.on('current-list', receiveList);
  socket.on('current-teams', receiveTeams);

  function addToList(newTeam) {
    socket.emit('signup', newTeam);
  };
  function adjustScore(adjustment) {
    socket.emit('adjust-score', adjustment);
  };
  function clearScore() {
    socket.emit('clear-score');
  };
  function getList() {
    socket.emit('get-list')
  };
  function getScore() {
    socket.emit('get-score');
  };
  function getTeams() {
    socket.emit('get-teams');
  };
  function nextTeam(color) {
    socket.emit('new-team', color);
  }
  function receiveList(signupList) {
    $rootScope.signupList = signupList;
    $rootScope.$apply();
  };
  function receiveScores(scores) {
    $rootScope.scores = scores;
    $rootScope.$apply();
  };
  function receiveTeams(teams) {
    $rootScope.teams = teams;
    $rootScope.$apply();
  };
}
