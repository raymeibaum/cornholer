const angular = require('angular');
require('angular-ui-router');

angular
  .module('project3', ['ui.router'])
  .config(uiRouterSetup);

uiRouterSetup.$inject = ['$stateProvider', '$urlRouterProvider'];

function uiRouterSetup($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<admin></admin>'
    })
    .state('gameView', {
      url: '/',
      template: '<game-view></game-view>',
      resolve: {
        checkLoggedIn: function checkLoggedIn(AuthService) {
          return AuthService.isLoggedIn();
        }
      }
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('register', {
      url: '/register',
      template: '<register></register>'
    })
    .state('play', {
      url: '/play',
      template: '<play></play>'
    })
    .state('userShow', {
      url: '/users/:username',
      template: '<user-show></user-show>'
    })
    .state('userSetting', {
      url: '/users/:username/settings',
      template: '<user-setting></user-setting>'
    })
    .state('nav', {
      url:'/nav',
      tmeplate: '<nav></nav>'
    });
  $urlRouterProvider.otherwise('/');
}
