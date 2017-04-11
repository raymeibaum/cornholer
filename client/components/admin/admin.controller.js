AdminController.$inject = ['$rootScope', 'GamesService', 'SocketService'];

function AdminController($rootScope, GamesService, SocketService) {
  const vm = this;

  vm.adjustScore = adjustScore;
  vm.clearScore = clearScore
  vm.saveGame = saveGame
  vm.nextTeam = nextTeam
  vm.scores = {
    red: 0,
    black: 0
  }
  vm.teams = {};

  activate();

  $rootScope.$watchCollection('scores', function(newScores) {
    vm.scores = newScores;
  });

  $rootScope.$watchCollection('teams', function(newTeams) {
    vm.teams = newTeams;
  });

  function activate() {
    SocketService.getScore();
  }

  function adjustScore(adjustment) {
    SocketService.adjustScore(adjustment);
  }
  function clearScore() {
    SocketService.clearScore();
  }
  function nextTeam(color) {
    SocketService.nextTeam(color);
  }
  function saveGame() {
    if (vm.scores.black > vm.scores.red) {
      var game = {
        users: [
          vm.teams.black.user1,
          vm.teams.black.user2,
          vm.teams.red.user1,
          vm.teams.red.user2],
        winner: {
          users: [vm.teams.black.user1, vm.teams.black.user2],
          score: vm.scores.black
        },
        loser: {
          users: [vm.teams.red.user1, vm.teams.red.user2],
          score: vm.scores.red
        }
      }
    } else {
      var game = {
        users: [
          vm.teams.black.user1,
          vm.teams.black.user2,
          vm.teams.red.user1,
          vm.teams.red.user2],
        winner: {
          users: [vm.teams.red.user1, vm.teams.red.user2],
          score: vm.scores.red
        },
        loser: {
          users: [vm.teams.black.user1, vm.teams.black.user2],
          score: vm.scores.black
        }
      }
    }
    GamesService
      .saveGame(game)
      .then(function() {
        SocketService.clearScore();
      });
  }
}

module.exports = AdminController;
