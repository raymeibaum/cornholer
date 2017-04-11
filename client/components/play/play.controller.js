PlayController.$inject = ['$rootScope', 'UsersService', 'SocketService']

function PlayController($rootScope, UsersService, SocketService) {
  const vm = this;

  vm.users = [];
  vm.currentUser = $rootScope.currentUser;
  vm.signup = {
    user1: vm.currentUser
  }
  vm.submitSignUp = submitSignUp;
  vm.list = [];

  activate()

  $rootScope.$watchCollection('list', function(updatedList) {
    vm.list = updatedList;
  });

  function activate() {
    UsersService
      .loadAll()
      .then(function setUsers(response) {
        vm.users = response.data.users;
      })
  }
  function submitSignUp() {
    // SocketService.
  }
}

module.exports = PlayController;
