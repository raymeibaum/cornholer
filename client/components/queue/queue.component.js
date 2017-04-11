const controller = require('./queue.controller.js');
const template = require('./queue.html');

const QueueComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('queue', QueueComponent);
