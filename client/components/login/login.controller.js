LoginController.$inject = ['AuthService'];

function LoginController(AuthService) {
  const vm = this;

  vm.user = {};
  vm.login = login

  function login(user) {
    AuthService
      .login(user)
      .then(function(user) {
        $rootScope.currentUser = user;
        $location.url("/");
      })
  }

}

module.exports = LoginController;
