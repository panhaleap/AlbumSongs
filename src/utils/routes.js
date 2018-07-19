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
      console.log('socket====', socket.handshake.query.token);
      socket.join(socket.handshake.query.token);
      socket.on('username', userName => {
        const user = {
          id: this.userInfo.id,
          userName: this.userInfo.username,
          role: this.userInfo.role,
          socketId: socket.id
        };

        if (!this.users.inArray(user)) this.users.push(user);
        this.io.emit('userList', this.users, this.userInfo.id, user.socketId);
      });

      socket.on('getMsg', data => {
        console.log('test getMsg', data);

        // socket.broadcast.to('abc').emit('sendMsg', {
        //   msg: data.msg,
        //   name: data.name
        // });

        // this.io.sockets.emit('sendMsg',  {
        //   msg: data.msg,
        //   name: data.name
        // });

        socket.broadcast.to('abc').emit('sendMsg', {
          msg: data.msg,
          name: data.name
        });

        socket.emit('sendMsg', {
          msg: data.msg,
          name: data.name
        });
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
