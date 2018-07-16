import JWT from 'jsonwebtoken';
import { Users } from './models/user';
import { succeed, failed } from './common/response';
import { Productions } from './models/production';
const { JWT_SECRET } = process.env;
import Sequelize from 'sequelize';
import { Songs } from './models/song';
import { ArtistSongs } from './models/artist-song';
import { Artists } from './models/artist';
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

export const secret1 = async (req, res) => {
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
  //await Songs.create({ 'WTFrog', 1, 1, artists: [{ id: 2 }] });

  //await Songs.create({name: 'WTFrog', album_id: 1, artists: [{ id: 1}]}, {include: [ ArtistSongs ]});
  const newSong = await Songs.create({ name: 'I hate this life', album_id: 1, category_id: 1 });
  await ArtistSongs.create({ songId: newSong.id, artistId: 5});

  const artistSongs = await Songs.findAll({ include: [{attributes: ['id'], model: Artists}] });
  //

  // include: [
  //   {
  //     attributes: ['content_id','group_id'],
  //     model: content_groupings, as: 'associated__content_id__content_groupings_obj',
  //     required: false
  //   }
  // ]

  //
  // const id = artistSongs[0].artists;
  const id = artistSongs;
  console.log('***********', id);
  return res.json(id);

  // return res.json('Hellllllllllll');
};

export const secret = async (req, res) => {
  console.log('secret  req: ', req.user);


  return res.json( req.user );
};