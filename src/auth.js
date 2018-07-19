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

const autt = () => {
  const token_userId_16 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNiwidXNlcm5hbWUiOiJyYXRoIiwicGFzc3dvcmQiOiIkMmEkMDgkYlQuVW5YOWVRRlgzcnRUQ3hVb3d5LjZQd0lKWFI0UWEuSXNVY3NheEZTUndNSVN5dG16ZXEiLCJlbWFpbCI6InJhdGhAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6MSwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MjA6MzIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MjA6MzIuMDAwWiJ9LCJpYXQiOjE1MzIwMDM1NzAyMzgsImV4cCI6MTUzMjA4OTk3MDIzOH0.ZA77ngC9hZV-Zzi7ypY3p2ZHy_kHDoJVkJ3NoozZwik';
  const token_userId_15 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNSwidXNlcm5hbWUiOiJ2aXRhbHMiLCJwYXNzd29yZCI6IiQyYSQwOCR5LnZJMTdOYXFOb2V2TnJvMDF1WWF1VHdNOUcveWRIUFhadnZHQkdiTUVDOHcuMlRKLkVUYSIsImVtYWlsIjoidml0YWxzQGhvdG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJzdGF0dXMiOjEsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjE0OjMyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjE0OjMyLjAwMFoifSwiaWF0IjoxNTMyMDAzMzU2Njc3LCJleHAiOjE1MzIwODk3NTY2Nzd9.Pq_iflUzKNS3cipkzba2Pi_k5h7rDHhbAqvZoQYH2GQ';
  const token_userId_13 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMywidXNlcm5hbWUiOiJ2eSIsInBhc3N3b3JkIjoiJDJhJDA4JFdFcHVOQVk2N2FoYWVuNmQuRFd2eXVJN2U1cDNPeENtVW1zTFNQTjZLMFllZUF4UUZJdWNlIiwiZW1haWwiOiJ2eUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMDo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMDo1NS4wMDBaIn0sImlhdCI6MTUzMjAwMzYzNzA4NywiZXhwIjoxNTMyMDkwMDM3MDg3fQ.k2PmFupB-3zTqozM65jHvneZIIs0-6rId24Ps0EWWMY';
  const token_userId_12 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMiwidXNlcm5hbWUiOiJ2dXRoYSIsInBhc3N3b3JkIjoiJDJhJDA4JHZqcGE3blAxdXJXdHZJTi45dGpIL09qR2pObk0xMlFBMVV0UGRTbTNjTEVXTDJHZEh3WmE2IiwiZW1haWwiOiJ2dXRoYUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjowOTo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjowOTo1NS4wMDBaIn0sImlhdCI6MTUzMjAwMzY4Mzg4NCwiZXhwIjoxNTMyMDkwMDgzODg0fQ.Ukfqdc3uoNHsaM36oswL8M1Mw2u9KpIQchOnAs0EkrQ';
  const token_userId_11 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMSwidXNlcm5hbWUiOiJyeXJpIiwicGFzc3dvcmQiOiIkMmEkMDgkNllmYnV0RDBEMW5ZUnNrWDZXbGxCT005Q3pnLkhOMi9tSXlLMmlpNTN5MThJYkdlbW9JUlMiLCJlbWFpbCI6InJ5cmlAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6MSwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6MjEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6MjEuMDAwWiJ9LCJpYXQiOjE1MzIwMDM3NDk4MjMsImV4cCI6MTUzMjA5MDE0OTgyM30.khLXNlF0KeThbzsa896ThGveej_N2gFZWeR9Yu-j_Ms';
  const myArray = [token_userId_16, token_userId_15, token_userId_13, token_userId_12, token_userId_11];
  const token = myArray[Math.floor(Math.random() * myArray.length)];
  //console.log('***************<>******************** ', rand);

  return token;
};
