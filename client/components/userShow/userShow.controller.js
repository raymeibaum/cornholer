UserShowController.$inject = ['$rootScope','$stateParams', 'UsersService'];

function UserShowController($rootScope, $stateParams, UsersService) {
  const vm = this;

  vm.thisUser = {};

  activate();

  function activate() {
    loadCurrentUser();
  }

  function loadCurrentUser() {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function(response) {
        vm.thisUser = response.data;
      });
  }
}

module.exports = UserShowController;
