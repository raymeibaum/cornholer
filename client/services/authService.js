angular
  .module('project3')
  .service('AuthService', AuthService);

AuthService.$inject = ['$http', '$q', '$location', '$rootScope'];

function AuthService($http, $q, $location, $rootScope) {
  const self = this;

  self.login = login;
  self.register = register;
  self.logout = logout;
  self.isLoggedIn = isLoggedIn;

  function login(user) {
    return $http.post('/login', user);
  }
  function register(user) {
    return $http.post('/register', user);
  }
  function logout() {
    return $http.post('/logout');
  }
  function isLoggedIn() {
    console.log('isLoggedIn called.')
    const deferred = $q.defer();
    $http
      .get('/loggedin')
      .success(function(user) {
        if (user) {
          $rootScope.currentUser = user;
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url('/login');
        }
      });
      return deferred.promise;
  }
}
