angular
  .module('project3')
  .service('GamesService', GamesService);

GamesService.$inject = ['$http'];

function GamesService($http) {
  const self = this;

  self.getGames = getGames;

  function getGames(username) {
    return $http.get('/api/games/' + username);
  }
}
