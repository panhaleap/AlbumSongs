import JWT from 'jsonwebtoken';
import { Users } from './models/user';
import { succeed, failed } from './common/response';
import { Productions } from './models/production';
const { JWT_SECRET } = process.env;
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
//const JWT_SECRET = 'Hello';

const singToken = user => {
  return JWT.sign(
    {
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), //Current Time
      exp: new Date().setDate(new Date().getDate() + 1) //Current time + 1 day ahead
    },
    JWT_SECRET
  );
};

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //return res.json(email);
    const userEmailExist = await Users.findOne({ where: { [Op.or]: [{ email }, { username }] } });

    //return res.json(userEmailExist);
    if (userEmailExist) {
      return failed(res, 'Username or Email, already in use', 400);
    }
    const newUser = new Users({ username, email, password });
    await newUser.save();

    const token = singToken(newUser);

    succeed(res, token, 200);
  } catch (error) {
    console.log(error);
    failed(res, error.message, 403);
  }
};

export const secret = async (req, res) => {
  console.log('secret  req: ', req.user);
  
  /*
  req.user ==> user id

  req.login()
  req.logout()
  req.isAuthenticated()
  req.isUnauthenticated()

***
https://blog.jscrambler.com/implementing-jwt-using-passport/

*
http://www.passportjs.org/docs/basic-digest/

https://www.sitepoint.com/using-json-web-tokens-node-js/

  */

  return res.json('Helllllllllllllllllllllllllllllllllllo');
};
