import 'dotenv/config';
import expresses from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { ENDPOINT, ADMIN_ENDPOINT } from './common/constant';
import productionRoute from './api/admin/production/production.route';
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

app.use(ENDPOINT + ADMIN_ENDPOINT, productionRoute);
app.listen(port, () => console.log(`Listen to port ${port}`));

sequelize.sync();
