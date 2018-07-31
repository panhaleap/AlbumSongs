'use strict';

class Routes {
  constructor(app, socket, auth) {
    this.app = app;
    this.io = socket;
    this.auth = auth;

    /*
      UserInfo stores object of logged in user
     */
    this.userInfo = {};

    /* 
			Array to store the list of users along with there respective socket id.
		*/
    this.users = [];
  }

  appRoutes() {
    this.app.use('/chat', this.auth, (request, response) => {
      response.render('html');
      this.userInfo = request.user;
    });
  }

  socketEvents() {
    this.io.on('connection', socket => {
      console.log('socket====', this.userInfo.id);
      socket.join(this.userInfo.id);
      socket.on('username', userName => {
        const user = {
          id: this.userInfo.id,
          userName: this.userInfo.username,
          role: this.userInfo.role
        };

        if (!this.users.inArray(user)) this.users.push(user);

        /*
          Remove duplicates Users object
        */
        new Set(this.users).toJSON();

        this.io.emit('userList', this.users, user.id, user.userName);
      });

      socket.on('getMsg', data => {
        console.log('test getMsg', data);

        if (socket.room && data.toId === null) {
          console.log('Chatting in room: ' + socket.room);
          this.io.sockets.in(socket.room).emit('sendMsg', {
            msg: data.msg,
            name: data.name,
            fromUserId: data.fromUserId
          });
        } else {
          socket.broadcast.to(data.toId).emit('sendMsg', {
            msg: data.msg,
            name: data.name,
            fromUserId: data.fromUserId
          });

          socket.emit('sendMsg', {
            msg: data.msg,
            name: data.name,
            fromUserId: data.fromUserId
          });
        }
      });

      socket.on('getRoomName', data => {
        console.log('test getRoomName ', data);
        const roomName = data.roomName;

        /*
          Join Room
        */
        if (roomName && roomName !== socket.room) {
          socket.join(roomName);
          this.io.sockets.in(roomName).emit('user_entered', data);
          socket.room = roomName;

          const clients = this.io.sockets.adapter.rooms[roomName];
          console.log('^^^^^^^&  ', this.io.sockets.adapter.rooms[roomName].length, ' @@@@');
        }
      });

      /*
         Leave Room
      */
      socket.on('leaveRoom', data => {
        console.log(data.username + ' left room ', socket.room);
        socket.leave(socket.room);
        socket.room = null;
      });

      socket.on('getInvitedUsers', data => {
        if (socket.room) {
          let invitedUsers = [];
          invitedUsers = data.invitedUsers;
          const invitedByUsername = data.invitedByUsername;
          console.log(
            ' >>>>>>>>>>> Users Invitation: users id ',
            invitedUsers,
            'to Room Chat ',
            socket.room,
            ' by ',
            invitedByUsername
          );

          /*
            Notification to the room that this users has been invited to join the group chat by ...
          */
          invitedUsers.forEach(item => {
            const user = JSON.parse(item);
            const inviteMsg = `&lt;a ng-click="confirm()"&gt; Click here to join group chat ${socket.room} &lt;/a/&gt;`;
            console.log('Invited by ', user.userName);
            console.log('Message of invitation: ', inviteMsg);
            socket.broadcast.to(user.id).emit('sendInvite', {
              msg: inviteMsg,
              name: user.userName,
              fromUserId: user.id
            });

            socket.emit('sendInvite', {
              msg: inviteMsg,
              name: user.userName,
              fromUserId: user.id
            });
          });
        }
      });

      socket.on('disconnect', () => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === socket.id) {
            this.users.splice(i, 1);
          }
        }
        this.io.emit('exit', this.users);
      });
    });
  }

  routesConfig() {
    this.appRoutes();
    this.socketEvents();
  }
}

/*
 * @function
 * @name Object.prototype.inArray
 * @description Extend Object prototype within inArray function
 *
 * @param {mix}    needle       - Search-able needle
 * @param {bool}   searchInKey  - Search needle in keys?
 *
 */
Object.defineProperty(Object.prototype, 'inArray', {
  value: function(needle, searchInKey) {
    var object = this;

    if (
      Object.prototype.toString.call(needle) === '[object Object]' ||
      Object.prototype.toString.call(needle) === '[object Array]'
    ) {
      needle = JSON.stringify(needle);
    }

    return Object.keys(object).some(function(key) {
      var value = object[key];

      if (
        Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]'
      ) {
        value = JSON.stringify(value);
      }

      if (searchInKey) {
        if (value === needle || key === needle) {
          return true;
        }
      } else {
        if (value === needle) {
          return true;
        }
      }
    });
  },
  writable: true,
  configurable: true,
  enumerable: false
});

module.exports = Routes;
