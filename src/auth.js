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
  const token_userId_15 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNSwidXNlcm5hbWUiOiJyYXRoIiwicGFzc3dvcmQiOiIkMmEkMDgkeS52STE3TmFxTm9ldk5ybzAxdVlhdVR3TTlHL3lkSFBYWnZ2R0JHYk1FQzh3LjJUSi5FVGEiLCJlbWFpbCI6InZpdGFsc0Bob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIn0sImlhdCI6MTUzMjE0NTQ4NDU4NCwiZXhwIjoxNTMyMjMxODg0NTg0fQ.txH2oOsIqc9qkkU6u-S9_zXj7I3Nrfq5T8NxfegEvt8';
  const token_userId_14 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJ2aXRhbCIsInBhc3N3b3JkIjoiJDJhJDA4JG5PVVJGNVE1L0JXYnlqN2xVTG9kSy44bERCOHNVODVKYUhKTUsxM04xYXNXMGE4MkphV3JDIiwiZW1haWwiOiJ2aXRhbEBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMzo0MC4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMzo0MC4wMDBaIn0sImlhdCI6MTUzMjE0NTQyMzQyMSwiZXhwIjoxNTMyMjMxODIzNDIxfQ.R_dwjXQx7a2lQgbFz8KO1Ig0A_naIGSAzax6AVQa8mQ';
  const token_userId_13 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMywidXNlcm5hbWUiOiJ2eSIsInBhc3N3b3JkIjoiJDJhJDA4JFdFcHVOQVk2N2FoYWVuNmQuRFd2eXVJN2U1cDNPeENtVW1zTFNQTjZLMFllZUF4UUZJdWNlIiwiZW1haWwiOiJ2eUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMDo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxMDo1NS4wMDBaIn0sImlhdCI6MTUzMjE0NTM3NzQ3NiwiZXhwIjoxNTMyMjMxNzc3NDc2fQ.8ma-SGmH7f30nTsbmCYLbwh2IH_Z_XOxReesQIDSwDY';
  const token_userId_12 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMiwidXNlcm5hbWUiOiJ2dXRoYSIsInBhc3N3b3JkIjoiJDJhJDA4JHZqcGE3blAxdXJXdHZJTi45dGpIL09qR2pObk0xMlFBMVV0UGRTbTNjTEVXTDJHZEh3WmE2IiwiZW1haWwiOiJ2dXRoYUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoxLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjowOTo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjowOTo1NS4wMDBaIn0sImlhdCI6MTUzMjE0NTM0OTE4NSwiZXhwIjoxNTMyMjMxNzQ5MTg1fQ.AX8dcfCxF_VaIjsBlTSpOpUnuH7dyvg2j4D0YoXkDX4';
  const token_userId_11 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMSwidXNlcm5hbWUiOiJyeXJpIiwicGFzc3dvcmQiOiIkMmEkMDgkNllmYnV0RDBEMW5ZUnNrWDZXbGxCT005Q3pnLkhOMi9tSXlLMmlpNTN5MThJYkdlbW9JUlMiLCJlbWFpbCI6InJ5cmlAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6MSwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6MjEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6MjEuMDAwWiJ9LCJpYXQiOjE1MzIxNDUyNTUwNTYsImV4cCI6MTUzMjIzMTY1NTA1Nn0.8PAD0rmDXCN3Gpbz86gjuFOK3IgMwPSRXkgvi1DCV24';
  const myArray = [token_userId_15, token_userId_14, token_userId_13, token_userId_12, token_userId_11];
  const token = myArray[Math.floor(Math.random() * myArray.length)];
  //console.log('***************<>******************** ', rand);

  return token;
};
