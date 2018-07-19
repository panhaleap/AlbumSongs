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
        //
        // const things = new Object();

        // things.thing = new Array();

        // things.thing.push({ place: 'here', name: 'stuff' });
        // things.thing.push({ place: 'there', name: 'morestuff' });
        // things.thing.push({ place: 'there', name: 'morestuff' });

        // const obj = {};

        // for (var i = 0, len = this.users.length; i < len; i++) obj[this.users[i]['place']] = this.users[i];

        // this.users = new Array();
        // for (var key in obj) this.users.push(obj[key]);
        //console.log('>>>>>>>>>>>>>><<<<<<<<<<< ',this.users);
        // const testUserlist = [ { id: 13,
        //   userName: 'vy',
        //   role: 'user' },
        // { id: 11,
        //   userName: 'ryri',
        //   role: 'user'},
        // { id: 16,
        //   userName: 'rath',
        //   role: 'user'},
        // { id: 13,
        //   userName: 'vy',
        //   role: 'user'} ];
        console.log('>>>>>>>>>>>>>>HHHH<<<<<<<<<<< ',new Set(this.users).toJSON());
        //
        this.io.emit('userList', this.users, user.id, user.userName);
      });

      socket.on('getMsg', data => {
        console.log('test getMsg', data);

        socket.broadcast.to(data.toId).emit('sendMsg', {
          msg: data.msg,
          name: data.name,
          fromUserId: this.userInfo.id
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
