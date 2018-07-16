// const router = require('express-promises-router');
// const passport = require('passport');
//const passportConf = require('./passport');
import { Router } from 'express';
import { secret } from './testAWT';
const testAWT_ROUTE = Router();

testAWT_ROUTE.get('/secret', secret);

export default testAWT_ROUTE;
