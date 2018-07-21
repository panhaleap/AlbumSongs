'use strict';

const app = angular.module('app', ['ngRoute']);

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

app.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'js/home.html',
			controller: 'StudentController'
		})
		.when('/viewStudents', {
			templateUrl: 'js/viewStudents.html',
			controller: 'StudentController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});

app.controller('app', ($scope, socket) => {
  $scope.userId = null;
  $scope.selectedUser = null;
  $scope.messages = [];
  $scope.msgData = null;
  $scope.userList = [];
  // $scope.technology = 'this is the tech page';
  // $scope.task = 'this is the task';

  $scope.seletedUser = selectedUser => {
    selectedUser === $scope.userId ? alert("Can't message to yourself.") : ($scope.selectedUser = selectedUser);
  };

  $scope.sendMsg = $event => {
    const keyCode = $event.which || $event.keyCode;

    if (keyCode === 13 && $scope.message !== null) {
      socket.emit('getMsg', {
        toId: $scope.selectedUser,
        msg: $scope.message,
        name: $scope.username,
        fromUserId: $scope.fromUserId
      });
      $scope.message = null;
    }
  };

  socket.emit('username', $scope.username);

  socket.on('userList', (userList, userId, userName) => {
    if ($scope.userId === null) {
      $scope.userId = userId;
      $scope.username = userName;
      $scope.fromUserId = userId;
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
