const express = require('express');
const {logger} = require('./middleware/middleware');
const router = require('./users/users-router');
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(logger);
server.use(helmet());

server.use('/api/users', router);


// global middlewares and the user's router need to be connected here


module.exports = server;
