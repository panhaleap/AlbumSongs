const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

import Sequelize from 'sequelize';
import { Users } from './models/user';

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
      var id = payload.sub;
      var user = await Users.findById(id); //Users.findOne({ where: { id } });
      if (user) {
        return done(null, {
          id: user.id
        });
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
