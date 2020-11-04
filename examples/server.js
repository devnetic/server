import * as server from './../src'

const app = server.createServer()

app.router.get('/ready', (request, response) => {
  response.json({ app: 'ok' })
})

app.router.get('/users', (request, response) => {
  console.log(request.query) // { limit: 10, offset: 2 }

  response.send('')
})

app.router.get('/user/:id', (request, response) => {
  response.json({ params: request.params })
})

app.router.get('/error', (request, response) => {
  response.json({ params: request.params }, 500)
})

app.router.get('/not-found', (request, response) => {
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
    response.json({ params: request.query })
  }
}]

app.router.group('v1', groupRoutes)

const port = 3000
const hostname = 'localhost'

app.listen(port, error => {
  if (error) {
    console.error('Something bad happened: %o', error)

    throw new Error(`Something bad happened ${error}`)
  }

  console.log(`Server is listening on host ${hostname} and port ${port}`)
})
