const controller = require('./score.controller.js');
const template = require('./score.html');

const ScoreComponent = {
  controller: controller,
  template: template
};

angular
  .module('project3')
  .component('score', ScoreComponent);
