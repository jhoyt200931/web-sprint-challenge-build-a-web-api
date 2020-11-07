const express = require('express');
const projectRouter = require('./projectRouter.js');
const server = express();

server.use(express.json());
server.use('/projects', projectRouter);


server.get('/', (req, res) => {
    res.send(`Sprint challenge API`);
  });





module.exports = server;