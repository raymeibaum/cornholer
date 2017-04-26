LoginController.$inject = ['$rootScope', '$state', 'AuthService'];

function LoginController($rootScope, $state, AuthService) {
  const vm = this;

  vm.user = {};
  vm.errorMessage = "";
  vm.login = login;

  function login() {
    AuthService
      .login(vm.user)
      .then(function(response) {
        $rootScope.currentUser = response.data;
        $state.go('gameView');
      }, function reject(error) {
        vm.errorMessage = "Incorrect username or password.";
      });
  }
}

module.exports = LoginController;
