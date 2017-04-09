angular
  .module('project3')
  .service('AuthService', AuthService);

AuthService.$inject = ['$http'];

function AuthService($http) {
  const self = this;

  self.login = login;
  self.register = register;
  self.logout = logout;

  function login(user) {
    return $http.post('/login', user);
  }
  function register(user) {
    return $http.post('/register', user);
  }
  function logout() {
    return $http.post('/logout');
  }
}
