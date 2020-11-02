const Server = require('./../lib')

const server = Server.createServer()

server.router.get('/ready', (request, response) => {
  response.json({ server: 'ok' })
})

server.router.get('/users', (request, response) => {
  console.log(request.query) // { limit: 10, offset: 2 }

  response.send()
})

server.router.get('/user/:id', (request, response) => {
  response.json({ params: request.params })
})

server.router.get('/error', (request, response) => {
  response.json({ params: request.params }, 500)
})

server.router.get('/not-found', (request, response) => {
  response.json({ params: request.params }, 404)
})

// Group routes example

const groupRoutes = [{
  method: 'post',
  path: 'login',
  handler: (request, response) => {
    response.json({ params: request.params })
  }
}, {
  method: 'post',
  path: 'register',
  handler: (request, response) => {
    response.json({ params: request.params })
  }
}, {
  method: 'get',
  path: 'logout',
  handler: (request, response) => {
    response.json({ params: request.params })
  }
}]

server.router.group('v1', groupRoutes)

server.listen(8080, '127.0.0.1', () => {
  console.log('listening as');
})
