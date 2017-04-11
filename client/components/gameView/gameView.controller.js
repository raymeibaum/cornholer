GameViewController.$inject = ['$rootScope', 'SocketService']

function GameViewController($rootScope, SocketService) {
  const vm = this;

  vm.signupList = [];
  vm.scores = {
    red: 0,
    black: 0
  }
  activate();

  $rootScope.$watchCollection('scores', function(newScores) {
    vm.scores = newScores;
  });

  $rootScope.$watchCollection('signupList', function(updatedList) {
    vm.signupList = updatedList;
  });

  function activate() {
    SocketService
      .getScore()

    SocketService
      .getList();
  }
}

module.exports = GameViewController;
