const controller = require('./navbar.controller.js');
const template = require('./navbar.html');

const NavbarComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('navbar', NavbarComponent);
