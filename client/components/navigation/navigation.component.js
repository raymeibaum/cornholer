const controller = require('./navigation.controller.js');
const template = require('./navigation.html');

const component = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('navigation', component);
