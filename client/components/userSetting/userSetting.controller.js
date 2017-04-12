UserSettingController.$inject = ['$rootScope','$stateParams', 'UsersService', '$state'];

function UserSettingController($rootScope, $stateParams, UsersService, $state) {
	const vm = this;

	vm.deleteUser = deleteUser;
	vm.updateUser = updateUser;
	vm.user = [];

	// vm.currentUser = $rootScope.currentUser;

  activate();

  function activate() {
    loadCurrentUser();
  }

	function loadCurrentUser() {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function(response) {
        vm.user = response.data;
      });
  }

	function updateUser() {
		const oldUsername = $stateParams.username;
		const updatedUserData = vm.user;

		UsersService
			.updateCurrent(oldUsername, updatedUserData)
			.then(function(response) {
				const username = response.data.user.username;
				$state.go('userShow', {  username: username });
			});
	}

	function deleteUser(user) {
		console.log(user)
		UsersService
			.deleteUser($stateParams.username)
			.then(function(response){

				$state.go('login');
			});
	}

}


module.exports = UserSettingController;
