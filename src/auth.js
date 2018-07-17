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
      jwtFromRequest: ExtractJwt.fromHeader('authorization')
    },
    async (payload, done) => {
      console.log('payload: ', payload);
      var user = payload.sub;

      if (user) {
        if (payload.exp <= Date.now()) {
          return done(null, false, { message: 'Expired Token' });
        } else {
          return done(null, { userInfo: user });
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
