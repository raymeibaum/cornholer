UserShowController.$inject = ['$rootScope','$stateParams', 'UsersService', 'GamesService'];

function UserShowController($rootScope, $stateParams, UsersService, GamesService) {
  const vm = this;

  vm.games = [];
  vm.currentUser = {};

  activate();

  function activate() {
    loadCurrentUser();
  }

  function loadCurrentUser() {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function setUser(response) {
        vm.currentUser = response.data;
      });
    GamesService
      .getGames($stateParams.username)
      .then(function setGames(response) {
        vm.games = response.data.games;
        console.log(vm.games);
      });
  }
}

module.exports = UserShowController;
