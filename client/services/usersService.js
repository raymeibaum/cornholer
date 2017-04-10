angular
  .module('project3')
  .service('UsersService', UsersService);

UsersService.$inject = ['$http', '$rootScope'];

function UsersService($http, $rootScope) {
  const self = this;

  self.loadAll = loadAll;
  self.loadCurrent = loadCurrent;

  function loadAll() {
    return $http.get('/api/users');
  }

  function loadCurrent(username) {
    return $http.get('/api/users/' + username);
  }
}
