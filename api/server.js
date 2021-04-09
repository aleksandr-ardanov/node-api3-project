require("dotenv").config();
const express = require('express');
const {logger} = require('./middleware/middleware');
const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const helmet = require('helmet');
const cors = require("cors")

const server = express();

server.use(express.json());
server.use(logger);
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('*', (req,res) => {
  res.status(404).json({message:"page not found"})
});

// global middlewares and the user's router need to be connected here


module.exports = server;
