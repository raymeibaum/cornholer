UserSettingController.$inject = ['$rootScope','$stateParams', 'UsersService'];

function UserSettingController($rootScope, $stateParams, UsersService) {
	const vm = this;

	vm.currentUser = $rootScope.currentUser;

  activate();

  function activate() {
    loadCurrentUser();
  }

	function loadCurrentUser() {
    UsersService
      .loadCurrent($rootScope.currentUser)
      .then(function() {
        vm.currentUser = $rootScope.currentUser;

      });
  }

}


module.exports = UserSettingController;
