const controller = require('./nav.controller.js');
const template = require('./nav.html');

const component = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('nav', component);
