NavigationController.$inject = ['$rootScope', '$state', 'AuthService'];

function NavigationController($rootScope, $state, AuthService) {
  const vm = this;

  vm.logOut = logOut;
  vm.currentUser = {};

  $rootScope.$on('currentUserUpdated', function updateCurrentUser() {
    vm.currentUser = $rootScope.currentUser;
  });

  activate();

  function activate() {
    
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

module.exports = NavigationController;
