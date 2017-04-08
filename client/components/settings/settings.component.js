const controller = require('./settings.controller.js');
const template = require('./settings.html');

const component = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('settings', component);
