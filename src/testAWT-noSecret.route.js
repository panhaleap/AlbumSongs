// const router = require('express-promises-router');
// const passport = require('passport');
//const passportConf = require('./passport');
import { Router } from 'express';
import { signUp } from './testAWT';
const testAWT_NS_ROUTE = Router();

testAWT_NS_ROUTE.post('/testAWT',signUp);

export default testAWT_NS_ROUTE;
