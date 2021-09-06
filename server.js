// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(express.json({
    type: ['application/json', 'text/plain']
}));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running, please wait for front-end to open');
});