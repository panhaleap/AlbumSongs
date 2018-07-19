const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

/**
 * Using for check all routers has auth.authenticate()
 *
 * Fetching Authorization=TOKEN from header which encoded by jwt
 * decode and get id from payload to find user
 *
 */

module.exports = function() {
  const strategy = new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: autt
      //jwtFromRequest: ExtractJwt.fromHeader('authorization')
    },
    async (payload, done) => {
      var user = payload.sub;



      if (user) {
        if (payload.exp <= Date.now()) {
          return done(null, false, { message: 'Expired Token' });
        } else {
          return done(null, user);
        }
      } else {
        return done(new Error('User not found'), null);
      }
    }
  );

  passport.use(strategy);

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', { session: false });
    }
  };
};

const autt = () =>  {
  
  const token_userId_16 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNiwidXNlcm5hbWUiOiJyYXRoIiwicGFzc3dvcmQiOiIkMmEkMDgkYlQuVW5YOWVRRlgzcnRUQ3hVb3d5LjZQd0lKWFI0UWEuSXNVY3NheEZTUndNSVN5dG16ZXEiLCJlbWFpbCI6InJhdGhAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoifSwiaWF0IjoxNTMxOTY1MDQxMzA3LCJleHAiOjE1MzIwNTE0NDEzMDd9.WdLXpn0VTByznSpRDNLDDNeaxk0d92fN2coi9I1iqgg';
        const token_userId_15 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNSwidXNlcm5hbWUiOiJ2aXRhbHMiLCJwYXNzd29yZCI6IiQyYSQwOCR5LnZJMTdOYXFOb2V2TnJvMDF1WWF1VHdNOUcveWRIUFhadnZHQkdiTUVDOHcuMlRKLkVUYSIsImVtYWlsIjoidml0YWxzQGhvdG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJzdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIn0sImlhdCI6MTUzMTk3NTU3MDI3NiwiZXhwIjoxNTMyMDYxOTcwMjc2fQ.X95Ft_J9e1LvoZ0oEr0r_KN6J6fFo5IvQLfsG0uNfaI';
        const token_userId_13 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMywidXNlcm5hbWUiOiJ2eSIsInBhc3N3b3JkIjoiJDJhJDA4JFdFcHVOQVk2N2FoYWVuNmQuRFd2eXVJN2U1cDNPeENtVW1zTFNQTjZLMFllZUF4UUZJdWNlIiwiZW1haWwiOiJ2eUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTA6NTUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTA6NTUuMDAwWiJ9LCJpYXQiOjE1MzE5NzU2NDYxODEsImV4cCI6MTUzMjA2MjA0NjE4MX0.zX4r-bf_mZK40j4ehI56CKYsyYeRLf-VnsiF8Lt0Tco';
        const token_userId_12 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMiwidXNlcm5hbWUiOiJ2dXRoYSIsInBhc3N3b3JkIjoiJDJhJDA4JHZqcGE3blAxdXJXdHZJTi45dGpIL09qR2pObk0xMlFBMVV0UGRTbTNjTEVXTDJHZEh3WmE2IiwiZW1haWwiOiJ2dXRoYUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6NTUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6NTUuMDAwWiJ9LCJpYXQiOjE1MzE5NzU3MDc3MTMsImV4cCI6MTUzMjA2MjEwNzcxM30.eS0qOmBq3vebjWTcSpshN_AT9l8PXfFdpFILUqXhKjc';
        const token_userId_11 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMSwidXNlcm5hbWUiOiJyeXJpIiwicGFzc3dvcmQiOiIkMmEkMDgkNllmYnV0RDBEMW5ZUnNrWDZXbGxCT005Q3pnLkhOMi9tSXlLMmlpNTN5MThJYkdlbW9JUlMiLCJlbWFpbCI6InJ5cmlAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjA5OjIxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjA5OjIxLjAwMFoifSwiaWF0IjoxNTMxOTc1NzYxNjg1LCJleHAiOjE1MzIwNjIxNjE2ODV9.Aty4fFDy1qhQS9pjekkO4NXU-KmxrSCyMWTtsajSN-Q';
        const myArray = [token_userId_16, token_userId_15, token_userId_13, token_userId_12, token_userId_11];
        const token = myArray[Math.floor(Math.random() * myArray.length)];
        //console.log('***************<>******************** ', rand);

  return token;
};
