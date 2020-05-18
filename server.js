const express = require('express');

//const logger = require('morgan')

const userRouter = require("./users/userRouter")

const postRouter = require("./posts/postRouter")

const server = express();

server.use(express.json())

var logger = function (req, res, next) {
  console.log('logger', req.method)
  next()
}
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

//server.use(logger('short'))


//custom middleware


//logger logs to the console the following information about each request: request method, request url, and a timestamp
//this middleware runs on every request made to the API







function errorHandler(error, req, res, next) {
  console.log('error: ', error.message);
  const code = error.status || error.statusCode || 400;
  res.status(code).json(error);
}

server.use(errorHandler);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;
