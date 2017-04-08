const controller = require('./admin.controller.js');
const template = require('./admin.html');

const AdminComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('adminComponent', AdminComponent);
