require("dotenv").config();
const express = require('express');
const cors = require("cors")
const {logger} = require('./middleware/middleware');
const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const helmet = require('helmet');

const server = express();

const port = process.env.PORT || 9000;


server.use(express.json());
server.use(logger);
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);


// server.get('/', (_, res) => {
//   res.send(`<h1>It's working</h1>`);
// });

server.use('*', (_,res) => {
  res.status(404).json({message:"page not found"})
});



// global middlewares and the user's router need to be connected here


module.exports = {server, port};
