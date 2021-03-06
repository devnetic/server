import http from 'http'
import http2 from 'http2'
import https from 'https'

import * as cli from '@devnetic/cli'
import { router } from '@devnetic/router'

/**
 * The complete Server interface
 *
 * @typedef {Object} Server
 * @property {Function} listen - Starts the HTTP server listening for connections.
 * @property {Router} router - The router module
 * @property {http.Server} server - The native server
 * @property {Function} usage - Show the server usage
 */

/**
 * The complete InstanceOptions interface
 *
 * @typedef {Object} InstanceOptions
 * @property {boolean} [http2=false] - Flag to use HTTP/2 module
 * @property {SecureServerOptions} [https=false] - An object used to configure the server's listening socket for TLS
 * @property {number} [keepAliveTimeout=5000] - Defines the server keep-alive timeout in milliseconds.
 */

/**
 *
 * @param {InstanceOptions} options
 * @param {Function} [requestListener]
 * @returns {Server}
 */
export const createServer = (options = {}, requestListener = router.attach) => {
  let server = null

  if (options.https) {
    if (options.http2) {
      server = http2.createSecureServer(options.https, requestListener)
    } else {
      server = https.createServer(options.https, requestListener)
      server.keepAliveTimeout = options.keepAliveTimeout ? options.keepAliveTimeout : 5000
    }
  } else if (options.http2) {
    server = http2.createServer(requestListener)
  } else {
    server = http.createServer(requestListener)
    server.keepAliveTimeout = options.keepAliveTimeout ? options.keepAliveTimeout : 5000
  }

  /**
   *
   * @param {number} port
   * @param {string} host
   * @param {Function} requestListener
   * @returns {void}
   */
  const listen = (port, host, requestListener = () => {}) => {
    if (!port) {
      throw new Error('KS0001: Please provide the port to listen')
    }

    if (typeof port !== 'number') {
      throw new Error('KS0002: Port needs to be a number')
    }

    if (typeof host === 'function') {
      requestListener = host
      host = '::'
    }

    server.listen(port, host, requestListener)

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
          }, 0)
        }
      })
    })
  }

  return {
    listen,
    router,
    server,
    usage
  }
}

/**
 * Show the usage message for the server
 *
 */
const usage = () => {
  cli.usage('Usage: $0 [options]')
    .option(['-p', '--port'], `Port to use [${process.env.PORT}]`)
    .option(['-H', '--host'], `Address to use [${process.env.HOST}]`)
    .option(['-s', '--silent'], 'Suppress log messages from output')
    .option(['--cors[=headers]'], 'Enable CORS via the "Access-Control-Allow-Origin" header.')
    .option([], 'Optionally provide CORS headers list separated by commas.')
    .option(['-S', '--ssl'], 'Enable https.')
    .option(['-C', ' --cert'], 'Path to ssl cert file (default: cert.pem).')
    .option(['-K', '--key'], 'Path to ssl key file (default: key.pem).')
    .option(['-h', '--help'], 'Print this list and exit.')
    .epilog(`Server package copyright ${new Date().getFullYear()}`)
    .show()
}
