UserShowController.$inject = ['$rootScope','$stateParams', 'UsersService', 'GamesService'];

function UserShowController($rootScope, $stateParams, UsersService, GamesService) {
  const vm = this;


  vm.thisUser = {};
  vm.games = [];


  activate();

  function activate() {
    loadCurrentUser();
  }

  function loadCurrentUser() {
    UsersService
      .loadCurrent($stateParams.username)
      .then(function(response) {
        vm.thisUser = response.data;
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
