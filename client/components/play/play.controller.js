PlayController.$inject = ['$rootScope', 'UsersService', 'SocketService']

function PlayController($rootScope, UsersService, SocketService) {
  const vm = this;

  vm.users = [];
  vm.currentUser = $rootScope.currentUser;
  vm.signup = {
    user1: vm.currentUser
  }
  vm.submitSignUp = submitSignUp;
  vm.signupList = [];

  activate()

  $rootScope.$watchCollection('signupList', function(updatedList) {
    vm.signupList = updatedList;
  });

  function activate() {
    SocketService
      .getList();

    UsersService
      .loadAll()
      .then(function setUsers(response) {
        vm.users = response.data.users;
      })
  }
  function submitSignUp() {
    SocketService
      .addToList(vm.signup);
  }
}

module.exports = PlayController;
