AdminController.$inject = ['$rootScope', 'GamesService', 'SocketService'];

function AdminController($rootScope, GamesService, SocketService) {
  const vm = this;

  const defaults = {
    scores: {
      red: 0,
      black: 0
    },
    teams: {
      red: {},
      black: {}
    }
  }

  vm.adjustScore = adjustScore;
  vm.clearScore = clearScore;
  vm.saveGame = saveGame;
  vm.nextTeam = nextTeam;
  vm.scores = defaults.scores;
  vm.teams = defaults.teams;

  vm.scoresNotZero = false;
  vm.twoTeamsPlaying = false;

  vm.validGame = validGame

  activate();

  $rootScope.$watchCollection('scores', function(newScores) {
    vm.scores = newScores || defaults.scores;
  });

  $rootScope.$watchCollection('teams', function(newTeams) {
    vm.teams = newTeams || defaults.teams;
  });

  function activate() {
    SocketService.getScore();
    SocketService.getTeams();
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

  function validGame() {
    vm.scoresNotZero = vm.scores.red > 0 || vm.scores.black > 0;
    vm.twoTeamsPlaying = vm.teams.red.user1 !== null && vm.teams.black.user1 !== null;

    return vm.scoresNotZero && vm.twoTeamsPlaying;
  }
}

module.exports = AdminController;
