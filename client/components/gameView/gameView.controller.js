GameViewController.$inject = ['$rootScope', 'SocketService']

function GameViewController($rootScope, SocketService) {
  const vm = this;

  vm.scores = {
    red: 0,
    black: 0
  }
  activate();

  $rootScope.$watchCollection('scores', function(newScores) {
    vm.scores = newScores;
  });

  function activate() {
    SocketService.getScore();
  }
}

module.exports = GameViewController;
