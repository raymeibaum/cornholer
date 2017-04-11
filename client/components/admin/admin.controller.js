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
    const red = vm.teams.red;
    const black = vm.teams.black;
    const users = [
      black.user1,
      black.user2,
      red.user1,
      red.user2
    ];
    const blackTeam = {
      users: [black.user1, black.user2],
      score: vm.scores.black
    }
    const redTeam = {
      users: [red.user1, red.user2],
      score: vm.scores.red
    }

    const isBlackWinner = vm.scores.black > vm.scores.red;

    const game = { users };
    game.winners = isBlackWinner ? blackTeam : redTeam;
    game.losers = isBlackWinner ? redTeam : blackTeam;

    GamesService
      .saveGame(game)
      .then(function() {
        SocketService.clearScore();
      });
  }
}

module.exports = AdminController;
