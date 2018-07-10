import 'dotenv/config';
import expresses from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {
  ENDPOINT,
  ADMIN_PRODUCTION_ENDPOINT,
  ADMIN_ALBUM_ENDPOINT,
  ADMIN_CATEGORIES_ENDPOINT,
  ADMIN_ARTIST_ENDPOINT,
  ADMIN_SONG_ENDPOINT
} from './common/constant';
import productionRoute from './api/admin/production/production.route';
import albumRoute from './api/admin/album/album.route';
import categoryRoute from './api/admin/category/category.route';
import artistRoute from './api/admin/artist/artist.route';
import songRoute from './api/admin/song/song.route';
const { sequelize } = require('./sequelize-connection');

const app = expresses();
const port = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
  next();
});

app.use(ENDPOINT + ADMIN_PRODUCTION_ENDPOINT, productionRoute);
app.use(ENDPOINT + ADMIN_ALBUM_ENDPOINT, albumRoute);
app.use(ENDPOINT + ADMIN_CATEGORIES_ENDPOINT, categoryRoute);
app.use(ENDPOINT + ADMIN_ARTIST_ENDPOINT, artistRoute);
app.use(ENDPOINT + ADMIN_SONG_ENDPOINT, songRoute);
app.listen(port, () => console.log(`Listen to port ${port}`));

sequelize.sync();
