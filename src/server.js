const http = require('http')

const router = require('@devnetic/router')

const Response = require('./Response')

/**
 * Read the body content from the request stream
 *
 * @param {IncomingMessage} request
 * @param {Function} callback
 */
const getBody = (request, callback) => {
  const bodyBuffer = []

  request.on('data', (chunk) => {
    bodyBuffer.push(chunk)
  })

  request.on('end', () => {
    const body = Buffer.concat(bodyBuffer).toString()

    if (request.headers['content-type'].includes('application/json')) {
      return callback(JSON.parse(body))
    }

    callback(body)
  })
}

/**
 *
 * @param {number} [port=process.env.PORT]
 * @param {string} [host=process.env.HOST]
 * @returns {void}
 */
const listen = (port = process.env.PORT, host = process.env.HOST) => {
  const server = http.createServer(requestHandler)

  server.listen(port, host, (error) => {
    if (error) {
      console.log('Something bad happened: %o', error)

      throw new Error(`Something bad happened ${error}`)
    }

    console.log(`Server is listening on host ${host} and port ${port}`)
  })

  let shuttingDown = false
  const signals = ['SIGINT', 'SIGTERM']

  signals.forEach(signal => {
    process.on(signal, () => {
      if (!shuttingDown) {
        console.log('Closing server')

        shuttingDown = true
        server.close()

        const timer = setTimeout(() => {
          console.log('Ending process')

          clearTimeout(timer)

          process.exit()
        })
      }
    })
  })
}

/**
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
const requestHandler = (request, response) => {
  const routes = router.checkRoute(request.url, request.method)

  if (routes.length === 0) {
    new Response(response).send('404 - Sorry, we can\'t find the page you were looking for.', 404)

    return
  }

  for (const route of routes) {
    request.params = route.params
    request.query = route.query

    switch (request.method) {
      case 'PATCH':
      case 'POST':
      case 'PUT':
        getBody(request, (body) => {
          request.body = body

          route.handler(request, new Response(response))
        })

        break
      default:
        route.handler(request, new Response(response))

        break
    }
  }
}

/**
 * Show the usage message for the server
 *
 */
const usage = () => {
  return [
    `  -p --port    Port to use [${process.env.PORT}]`,
    `  -H --host    Address to use [${process.env.HOST}]`,
    '  -s --silent  Suppress log messages from output',
    '  --cors[=headers]   Enable CORS via the "Access-Control-Allow-Origin" header',
    '                     Optionally provide CORS headers list separated by commas',
    '  -S --ssl     Enable https.',
    '  -C --cert    Path to ssl cert file (default: cert.pem).',
    '  -K --key     Path to ssl key file (default: key.pem).',
    '',
    '  -h --help    Print this list and exit.'
  ].join('\n')
}

module.exports = {
  listen,
  router,
  usage
}
