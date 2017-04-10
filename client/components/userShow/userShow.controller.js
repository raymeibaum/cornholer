UserShowController.$inject = ['$rootScope','$stateParams', 'UsersService'];

function UserShowController($rootScope, $stateParams, UsersService) {
  const vm = this;

  vm.currentUser = $rootScope.currentUser;

  activate();

  function activate() {
    loadCurrentUser();

  }

  function loadCurrentUser() {
    UsersService
      .loadCurrent($rootScope.currentUser)
      .then(function() {
        vm.currentUser = $rootScope.currentUser;

      });
  }

}

module.exports = UserShowController;
