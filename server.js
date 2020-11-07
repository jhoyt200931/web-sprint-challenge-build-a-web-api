const express = require('express');
const projectRouter = require('./projectRouter.js');
const actionRouter = require('./actionRouter.js');
const server = express();

server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);


server.get('/', (req, res) => {
    res.send(`Sprint challenge API`);
  });





module.exports = server;