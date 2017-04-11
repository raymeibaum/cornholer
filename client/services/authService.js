angular
  .module('project3')
  .service('AuthService', AuthService);

AuthService.$inject = ['$http', '$q', '$state', '$rootScope'];

function AuthService($http, $q, $state, $rootScope) {
  const self = this;

  self.login = login;
  self.register = register;
  self.logout = logout;
  self.isLoggedIn = isLoggedIn;

  function login(user) {
    return $http
      .post('/login', user)
      .then(function setCurrentUser(response) {
        console.log(response);
        $rootScope.currentUser = response.data;
        return response;
      });
  }
  function register(user) {
    return $http.post('/register', user);
  }
  function logout() {
    return $http
      .post('/logout')
      .then(function removeCurrentUser() {
        $rootScope.currentUser = null;
        $rootScope.$emit('currentUserUpdated');
      });
  }
  function isLoggedIn() {
    const deferred = $q.defer();
    $http
      .get('/loggedin')
      .then(function(response) {
        if (response.data !== '0') {
          $rootScope.currentUser = response.data;
          $rootScope.$emit('currentUserUpdated');
          deferred.resolve();
        } else {
          deferred.reject();
          $state.go('login');
        }
      });

    return deferred.promise;
  }
}
