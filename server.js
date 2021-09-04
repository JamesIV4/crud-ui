// server.js
const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const whitelist = [
    'http://localhost:4200'
]

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Accept, Content-Type'
};

server.use(cors(corsOptions));

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(express.json({
    type: ['application/json', 'text/plain']
}));

server.options('/users/:id', cors()); // enable pre-flight request for DELETE request
server.delete('/users/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

server.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    });

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
        console.log('Received');
        console.log(req);
    }
    // Continue to JSON Server router
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else  {
        next();
    }
});


server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running, please wait for front-end to open');
});