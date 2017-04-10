// function UserSettingController() {
//   const vm = this;
// }
//
// module.exports = UserSettingController;

UserSettingController.$inject = ['$stateParams', 'UsersService'];

function UserSettingController($stateParams, UsersService) {
	const vm = this;

	vm.current = {};

  activate();

  function activate() {
    loadCurrentUser();
  }

  function loadCurrentUser(id) {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function resolve(response) {
        vm.current = response.data.user;
      });
  }

}



module.exports = UserSettingController;
