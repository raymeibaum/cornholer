ScoreController.$inject = ['$rootScope', 'SocketService'];

function ScoreController($rootScope, SocketService) {
  const vm = this;

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
    SocketService.getTeams();
  }
}

module.exports = ScoreController;
