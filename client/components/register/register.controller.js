RegisterController.$inject = ['$rootScope', '$state', 'AuthService'];

function RegisterController($rootScope, $state, AuthService) {
  const vm = this;

  vm.user = {};
  vm.errorMessage = "";
  vm.register = register;

  function register() {
    AuthService
      .register(vm.user)
      .then(function resolve(response) {
        $rootScope.currentUser = response.data;
        $state.go('gameView');
      }, function reject() {
        vm.errorMessage = "Username taken or passwords don't match.";
      })
  }
}

module.exports = RegisterController;
