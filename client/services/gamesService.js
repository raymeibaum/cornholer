angular
  .module('project3')
  .service('GamesService', GamesService);

GamesService.$inject = ['$http'];

function GamesService($http) {
  const self = this;

  self.getGames = getGames;
  self.saveGame = saveGame;

  function getGames(username) {
    return $http.get('/api/games/' + username);
  }
  function saveGame(game) {
    return $http.post('/api/games/', game);
  }
}
