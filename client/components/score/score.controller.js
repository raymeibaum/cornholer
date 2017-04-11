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

  function activate() {
    SocketService
      .getScore()
  }
}

module.exports = ScoreController;
