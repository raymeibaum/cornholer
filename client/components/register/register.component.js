const controller = require('./register.controller.js');
const template = require('./register.html');

const RegisterComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('register', RegisterComponent);
