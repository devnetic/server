const server = require('./../index')

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

server.listen()
