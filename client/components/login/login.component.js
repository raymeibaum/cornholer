const controller = require('./login.controller.js');
const template = require('./login.html');

const LoginComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('login', LoginComponent);
