'use strict';

const app = angular.module('app', []);

/* 
    Making factory method for socket 
*/
app.factory('socket', function($rootScope) {
  const socket = io('http://localhost:8080?token=abc',{
    reconnection: true
  });
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});

app.controller('app', ($scope, socket) => {
  $scope.userId = null;
  $scope.selectedUser = null;
  $scope.messages = [];
  $scope.msgData = null;
  $scope.userList = [];

  $scope.seletedUser = selectedUser => {
    selectedUser === $scope.userId ? alert("Can't message to yourself.") : ($scope.selectedUser = selectedUser);
  };

  $scope.sendMsg = $event => {
    const keyCode = $event.which || $event.keyCode;

    if (keyCode === 13 && $scope.message !== null) {
      socket.emit('getMsg', {
        toId: '123',
        msg: $scope.message,
        name: $scope.username
      });
      $scope.message = null;
    }
  };

  socket.emit('username', $scope.username);

 

  socket.on('userList', (userList, userId, socketId) => {
    if ($scope.userId === null) {
      $scope.userId = userId;

    }
    $scope.userList = userList;
  });

  socket.on('exit', userList => {
    $scope.userList = userList;
  });

  socket.on('sendMsg', data => {
    console.log('he looo', data);
    $scope.messages.push(data);
  });
});
