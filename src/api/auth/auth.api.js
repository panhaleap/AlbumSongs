const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = process.env;

// import JWT from 'jsonwebtoken';
import { Users } from '../../models/user';
import { succeed } from '../../common/response';

// JWT.sign == jwt.encode

const singToken = user => {
  return jwt.encode(
    {
      iss: 'CodeWorkr',
      sub: user.id,
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
        token: token
      });
    }
  }

  return res.sendStatus(401);
};

export const postSignUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
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
