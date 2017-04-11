UserSettingController.$inject = ['$rootScope','$stateParams', 'UsersService', '$state'];

function UserSettingController($rootScope, $stateParams, UsersService, $state) {
	const vm = this;

	vm.deleteUserFromCtrl = deleteUserFromCtrl;
	vm.updateUser = updateUser;
	vm.user = {};

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

	function deleteUserFromCtrl(user) {
		console.log(user)
		UsersService
			.deleteUserFromService(user)
			.then(function(response){
				var index = vm.users.indexOf(user);
				vm.users.splice(index, 1);
				$state.go('login');
			});
	}

}


module.exports = UserSettingController;
