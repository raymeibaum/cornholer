NavbarController.$inject = ['$rootScope', '$state', 'AuthService'];

function NavbarController($rootScope, $state, AuthService) {
  const vm = this;

  vm.logOut = logOut;
  vm.currentUser = $rootScope.currentUser;

  activate();

  $rootScope.$on('$stateChangeSuccess', setCurrentUser)

  function activate() {
    console.log($rootScope.currentUser);
  }
  function logOut() {
    AuthService
      .logout()
      .then(function() {
        $rootScope.currentUser = null;
        $state.go('login');
      })
  }
  function setCurrentUser() {
    vm.currentUser = $rootScope.currentUser;
  }
}

module.exports = NavbarController;
