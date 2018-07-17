const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import { succeed, failed } from '../../common/response';
// import JWT from 'jsonwebtoken';
import { Users } from '../../models/user';

// JWT.sign == jwt.encode

const singToken = user => {
  return jwt.encode(
    {
      iss: 'User Authentication',
      sub: user,
      iat: new Date().getTime(), //Current Time
      exp: new Date().setDate(new Date().getDate() + 1) //Current time + 1 day ahead
    },
    JWT_SECRET
  );
};

export const postSignIn = async (req, res) => {
  const { email, username, password } = req.body;

  if ((email || username) && password) {
    var user = null;

    if (email) {
      user = await Users.findOne({ where: { email } });
    } else if (username) {
      user = await Users.findOne({ where: { username } });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      var token = singToken(user);

      return res.json({
        userInfo: user,
        token: token
      });
    }
  }

  return res.sendStatus(401);
};

export const postSignUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userEmailExist = await Users.findOne({ where: { [Op.or]: [{ email }, { username }] } });

    if (userEmailExist) {
      return failed(res, 'Username or Email, already in use', 400);
    }
    const newUser = await Users.create({ username, email, password }, { raw: true });

    const token = singToken(newUser);

    succeed(res, { newUser, token }, 200);
  } catch (error) {
    console.log(error);
    failed(res, error.message, 403);
  }
};
