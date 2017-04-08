const controller = require('./play.controller.js');
const template = require('./play.html');

const component = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('play', component);
