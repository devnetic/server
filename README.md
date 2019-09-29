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

server.router.get('/ready', (request, response) => {
  response.json({ server: 'ok' })
})

server.listen()
```

## Routing
For more information about routing please read the [router](https://www.npmjs.com/package/@devnetic/router) module docs.
```javascript
const server = require('@devnetic/server')

server.router.get('/ready', (request, response) => {
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

# Changelog

### Version 1.0.0
- Initial release

# TODO
- [ ] Write test cases.
- [ ] Add code coverage.
