RegisterController.$inject = ['$rootScope', '$location', 'AuthService'];

function RegisterController($rootScope, $location, AuthService) {
  const vm = this;

    vm.user = {};
    vm.register = register

    function register() {
      AuthService
        .register(vm.user)
        .then(function(user) {
          $rootScope.currentUser = user;
          $location.url("/");
        })
    }
}

module.exports = RegisterController;
