AdminController.$inject = ['$rootScope', 'SocketService'];

function AdminController($rootScope, SocketService) {
  const vm = this;
  const socket = io();

  vm.adjustScore = adjustScore;
  vm.scores = {
    red: 0,
    black: 0
  }
  activate();

  socket.on('current-score', function(scores) {
    console.log(scores);
    vm.scores = scores;
    $rootScope.$apply();
  });

  function activate() {
    console.log('activate');
    SocketService.getScore();
  }

  function adjustScore(adjustment) {
    SocketService.adjustScore(adjustment);
  }
}

module.exports = AdminController;
