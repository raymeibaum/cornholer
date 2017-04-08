const controller = require('./userSetting.controller.js');
const template = require('./userSetting.html');

const component = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('userSetting', component);
