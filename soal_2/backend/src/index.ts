import express, { Request, Response } from 'express';
const core = require('./server/server');
import Logger from './helpers/winston.helper';
import moment from 'moment';
moment.locale('id');
import dotenv from 'dotenv';

// import { listenMessageFromSocket } from '@/helpers/socket.io.helper';
import { Server } from 'socket.io';
const cluster = require('node:cluster');
const totalCPUs = require('node:os').cpus().length;
const process = require('node:process');
dotenv.config();

let server: any;

// serve directly the public folder
core.use(express.static('public'));

// set port, listen for requests
const port = process.env.PORT || 3000;

if (process.env.NODE_CLUSTER === 'ACTIVE') {
  if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      // for (let i = 0; i < 2; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker: any, code: any, signal: any) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      console.log('with code: ' + code);
      cluster.fork();
    });

    console.log(`worker pid=${process.pid}`);
  } else {
    server = core.listen(port, () =>
      Logger.info(`⚡️[Server]: ExpressAPI is running at ${port}`)
    );
  }
} else {
  server = core.listen(port, () =>
    Logger.info(`⚡️[Server]: ExpressAPI is running at ${port}`)
  );
}

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
    ],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  const id = socket.handshake.query.id as any;
  console.info(`Client connected [id = ${socket.id}], [clientId = ${id}]`);
  socket.join(id);

  Logger.info(`Socket connected ${socket.id}`);
  console.log(socket.id);

});

export default io;