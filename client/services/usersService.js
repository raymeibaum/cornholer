angular
  .module('project3')
  .service('UsersService', UsersService);

UsersService.$inject = ['$http'];

function UsersService($http) {
  const self = this;

  self.loadAll = loadAll;
  self.loadCurrent = loadCurrent;
  self.updateCurrent = updateCurrent;
  self.deleteUserFromService = deleteUserFromService;

  function loadAll() {
    return $http.get('/api/users');
  }

  function loadCurrent(username) {
    return $http.get('/api/users/' + username);
  }

  function updateCurrent(username, data) {
    const url = '/api/users/' + username;

    return $http.patch(url, data);
  }
  function deleteUserFromService(user) {
    return $http.delete('/api/users/' + username);
  }
}
