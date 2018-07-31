'use strict';

const app = angular.module('app', ['ngRoute']);

/* 
    Making factory method for socket 
*/
app.factory('socket', function($rootScope) {
  const socket = io('http://localhost:8080?token=abc', {
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
      templateUrl: 'group-chat.html',
      controller: 'app'
    })
    .when('/viewGroupChats', {
      templateUrl: 'viewGroupChats.html',
      controller: 'app'
    })
    .when('/inviteToRoomChat', {
      templateUrl: 'group-chat-invite.html',
      controller: 'app'
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
  $scope.userNameEntereds = [];
  $scope.showListUser = true;
  $scope.invitedUsers = [];

  $scope.inviteToRoom = () => {
    $scope.showListUser = false;
    console.log($scope.showListUser);
  };

  $scope.seletedUser = selectedUser => {
    selectedUser === $scope.userId ? alert("Can't message to yourself.") : ($scope.selectedUser = selectedUser);
  };

  $scope.startChatRoom = $event => {
    const keyCode = $event.which || $event.keyCode;

    if (keyCode === 13 && $scope.roomName !== null) {
      socket.emit('getRoomName', {
        username: $scope.username,
        fromUserId: $scope.fromUserId,
        roomName: $scope.chatRoom
      });
      $scope.chatRoom = null;
    }
  };

  $scope.leaveRoom = () => {
    socket.emit('leaveRoom', {
      username: $scope.username,
      fromUserId: $scope.fromUserId,
      roomName: $scope.chatRoom
    });
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

  $scope.getSelectedUsersToRoom = selectedUsers => {
    $scope.showListUser = true;
    $scope.invitedUsers = selectedUsers;
    console.log($scope.showListUser, '>>>>>>>> Selected user ' + $scope.invitedUsers);

    socket.emit('getInvitedUsers', {
      invitedUsers: $scope.invitedUsers,
      invitedByUserId: $scope.fromUserId,
      invitedByUsername: $scope.username
    });
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
    $scope.messages.push(data);
  });

  socket.on('sendInvite', data => {
    $scope.messages.push(data);
  });

  socket.on('user_entered', data => {
    $scope.userNameEntereds.push(data);
    $scope.roomName = data.roomName;
  });
});
