LoginController.$inject = ['$rootScope', '$location', 'AuthService'];

function LoginController($rootScope, $location, AuthService) {
  const vm = this;

  vm.user = {};
  vm.login = login

  function login() {
    AuthService
      .login(vm.user)
      .then(function(user) {
        $rootScope.currentUser = user;
        $location.url("/");
      });
  }
}

module.exports = LoginController;
