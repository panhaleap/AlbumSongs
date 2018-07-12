const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = process.env;
import Sequelize from 'sequelize';
import { Users } from './models/user';
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) =>{
    try {
        const id = payload.sub;
      //find the user specified in token
      const user = await Users.findOne({ where: {id} });

      //if user doesn't exists, handle it
          if (!user){
            return done(null, false);
          }
      //Otherwise, return the user
      done(null, user);
    } catch (error) {
        done(error, false);
    }
}));
