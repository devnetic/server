# @devnetic/server

![npm (scoped)](https://img.shields.io/npm/v/@devnetic/server)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@devnetic/server?color=red)
![npm](https://img.shields.io/npm/dt/@devnetic/server)
![GitHub issues](https://img.shields.io/github/issues-raw/devnetic/server)
![GitHub](https://img.shields.io/github/license/devnetic/server)

A modern, powerful and blasing fast server for Node.js

# Usage

## Basic Server
```javascript
const server = require('@devnetic/server')
// import * as server from '@devnetic/server'

const app = server.createServer()

app.router.get('/ready', (request, response) => {
  response.json({ server: 'ok' })
})

app.listen()
```

## Routing
For more information about routing please read the [router](https://www.npmjs.com/package/@devnetic/router) module docs.
```javascript
const server = require('@devnetic/server')
// import * as server from '@devnetic/server'

const app = server.createServer()

app.router.get('/ready', (request, response) => {
  response.json({ server: 'ok' })
})

// http://localhost:3000/users?limit=10&offset=2
server.router.get('/users', (request, response) => {
  console.log(request.query) // { limit: '10', offset: '2' }
})

// http://localhost:3000/users
server.router.post('/users', (request, response) => {
  console.log(request.body)  // the request payload
})

// http://localhost:3000/users/10
server.router.get('/users/:id', (request, response) => {
  console.log(request.params) // { id: '10' }
})

server.listen() // use default port is 3000, but you can use other
```

## Adding a route group

```javascript
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
server.listen() // use default port is 3000, but you can use other
```

## Configuration

There are configuration option available when you are creating the server:

```javascript
  const app = server.createServer({
    keepAliveTimeout: number
    http2: Object,
    http2: Object
  })
```
