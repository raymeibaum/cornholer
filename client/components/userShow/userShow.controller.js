UserShowController.$inject = ['$stateParams', 'UsersService'];

function UserShowController($stateParams, UsersService) {
  const vm = this;

  vm.current = {};

  activate();

  function activate() {
    loadCurrentUser();
  }

  function loadCurrentUser() {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function resolve(response) {
        console.log(response);
        vm.current = response.data;
      });
  }

}

module.exports = UserShowController;
