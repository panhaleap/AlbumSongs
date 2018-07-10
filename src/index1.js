import 'dotenv/config';
import expresses from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const { sequelize } = require('./sequelize-connection');

import { Artists } from './models/artist';
import { Users } from './models/user';
import { Productions } from './models/production';
import { Albums } from './models/album';
import { Categories } from './models/category';
import { Songs } from './models/song';
import { ArtistSongs } from './models/artist_song';
import { Playlists } from './models/playlist';

const app = expresses();
const port = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/test', async (req, res) => {
  sequelize.sync();
  await Users.create({ username: 'test2', password: '123', email: 'panha@hotmail.com', role: 'public', createdBy: 1, updatedBy: 1  });
  const data = await Users.findAll();
  res.json(data);
});


app.use('/test2', async (req, res) => {
  await Artists.create({ name: 'test1', type: 'old', createdBy: 1, updatedBy: 1  });
  const data = await Artists.findAll();
  res.json(data);
});

app.use('/test3', async (req, res) => {
  await Productions.create({ name: 'test1', createdBy: 1, updatedBy: 1  });
  const data = await Productions.findAll();
  res.json(data);
});

app.use('/test4', async (req, res) => {
  await Albums.create({ name: 'test1', createdBy: 1, updatedBy: 1, production_id: 1  });
  const data = await Albums.findAll();
  res.json(data);
});


app.use('/test5', async (req, res) => {
  await Categories.create({ name: 'test2', createdBy: 1, updatedBy: 1  });
  const data = await Categories.findAll();
  res.json(data);
});

app.use('/test6', async (req, res) => {
  await Songs.create({ name: 'test1', createdBy: 1, updatedBy: 1, album_id: 1, category_id: 1 });
  const data = await Songs.findAll();
  res.json(data);
});

app.use('/test7', async (req, res) => {
  await ArtistSongs.create({ artistId: 4 , songId: 3});
  const data = await ArtistSongs.findAll();
  res.json(data);
});

app.use('/test8', async (req, res) => {
  await Playlists.create({ name: 'test4' , userId: 1, });
  const data = await Playlists.findAll();
  res.json(data);
});

app.listen(port, () => console.log(`Listen to port ${port}`));
