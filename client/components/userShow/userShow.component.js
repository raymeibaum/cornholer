const controller = require('./userShow.controller.js');
const template = require('./userShow.html');

const UserShowComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('userShow', UserShowComponent);
