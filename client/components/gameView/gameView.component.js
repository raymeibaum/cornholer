const controller = require('./gameView.controller.js');
const template = require('./gameView.html');

const GameViewController = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('gameView', GameViewController);
