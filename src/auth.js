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
      //jwtFromRequest: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNiwidXNlcm5hbWUiOiJyYXRoIiwicGFzc3dvcmQiOiIkMmEkMDgkYlQuVW5YOWVRRlgzcnRUQ3hVb3d5LjZQd0lKWFI0UWEuSXNVY3NheEZTUndNSVN5dG16ZXEiLCJlbWFpbCI6InJhdGhAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoifSwiaWF0IjoxNTMxOTY1MDQxMzA3LCJleHAiOjE1MzIwNTE0NDEzMDd9.WdLXpn0VTByznSpRDNLDDNeaxk0d92fN2coi9I1iqgg'//ExtractJwt.fromHeader('authorization')
      jwtFromRequest: autt
    },
    async (payload, done) => {
      console.log('payload: ', payload);
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
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNiwidXNlcm5hbWUiOiJyYXRoIiwicGFzc3dvcmQiOiIkMmEkMDgkYlQuVW5YOWVRRlgzcnRUQ3hVb3d5LjZQd0lKWFI0UWEuSXNVY3NheEZTUndNSVN5dG16ZXEiLCJlbWFpbCI6InJhdGhAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjIwOjMyLjAwMFoifSwiaWF0IjoxNTMxOTY1MDQxMzA3LCJleHAiOjE1MzIwNTE0NDEzMDd9.WdLXpn0VTByznSpRDNLDDNeaxk0d92fN2coi9I1iqgg';
  return token;
};
