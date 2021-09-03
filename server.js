// server.js
const jsonServer = require('json-server')
//const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

//server.use(cors)

//server.options('/users/id', cors()) // enable pre-flight request for DELETE request
//server.delete('/users/id', cors(), function (req, res, next) {
//  res.json({msg: 'This is CORS-enabled for all origins!'})
//})

server.use((req, res, next) => {
  res.set({

    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  })

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    console.log('Received')
    console.log(req)
  }
  // Continue to JSON Server router
  next()
})


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})