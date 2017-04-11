QueueController.$inject = ['$rootScope','SocketService'];

function QueueController($rootScope, SocketService) {
  const vm = this;

  vm.signupList = [];

  activate();

  $rootScope.$watchCollection('signupList', function(updatedList) {
    vm.signupList = updatedList;
  });

  function activate() {
    SocketService.getList();
  }
}

module.exports = QueueController;
