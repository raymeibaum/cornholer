angular
  .module('project3')
  .service('UsersService', UsersService);

UsersService.$inject = ['$http'];

function UsersService($http) {
  const self = this;

  self.loadAll = loadAll;
  self.loadCurrent = loadCurrent;
  self.updateCurrent = updateCurrent;
  self.deleteUser = deleteUser;

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
  
  function deleteUser(username) {
    return $http.delete('/api/users/' + username);
  }
}
