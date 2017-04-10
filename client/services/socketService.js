angular
  .module('project3')
  .service('SocketService', SocketService);

function SocketService() {
  const self = this;
  const socket = io();
}
