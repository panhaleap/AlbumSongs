import 'dotenv/config';
import expresses from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const { sequelize } = require('./sequelize-connection');

import { Artists } from './models/artist';
import { Users } from './models/user';

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

app.listen(port, () => console.log(`Listen to port ${port}`));
