import http from 'http'
import https from 'https'

import test from 'ava'

import * as server from '../src'

test('create HTTP server without config', (t) => {
  const app = server.createServer()

  t.true(app.server instanceof http.Server)
})

test('create HTTP server with config', (t) => {
  const app = server.createServer({
    keepAliveTimeout: 8000
  })

  t.is(app.server.keepAliveTimeout, 8000)
})

test('create HTTP/2 server', (t) => {
  const app = server.createServer({
    http2: {}
  })

  t.true(app.server.constructor.name === 'Http2Server')
})

test('create HTTPS server', (t) => {
  const app = server.createServer({
    https: {}
  })

  t.true(app.server instanceof https.Server)
})
