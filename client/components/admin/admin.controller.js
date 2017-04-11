AdminController.$inject = ['$rootScope', 'SocketService'];

function AdminController($rootScope, SocketService) {
  const vm = this;

  vm.adjustScore = adjustScore;
  vm.clearScore = clearScore
  vm.saveGame = saveGame
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

  function adjustScore(adjustment) {
    SocketService.adjustScore(adjustment);
  }
  function clearScore() {
    SocketService.clearScore();
  }
  function saveGame() {

  }
}

module.exports = AdminController;
