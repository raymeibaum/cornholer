RegisterController.$inject = ['$rootScope', '$state', 'AuthService'];

function RegisterController($rootScope, $state, AuthService) {
  const vm = this;

    vm.user = {};
    vm.register = register

    function register() {
      AuthService
        .register(vm.user)
        .then(function(response) {
          $rootScope.currentUser = response.data;
          $state.go('gameView');
        })
    }
}

module.exports = RegisterController;
