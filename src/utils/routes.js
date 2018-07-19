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
    // this.app.get('/chat', (request, response) => {
    //   response.render('html');
    // });
    this.app.use('/chat', this.auth, (request, response) => {
      response.render('html');
      this.userInfo = request.user;
    });
  }

  socketEvents() {
    this.io.on('connection', socket => {
      socket.on('username', userName => {
        this.users.push({
          id: socket.id,
          userName: this.userInfo.username,
          role: this.userInfo.role
        });

        let len = this.users.length;
        len--;

        this.io.emit('userList', this.users, this.users[len].id);
      });

      socket.on('getMsg', data => {
          socket.broadcast.to(data.toid).emit('sendMsg', {
          //socket.connected[ socket.id ].emit('sendMsg', {
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
module.exports = Routes;
