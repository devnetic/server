import http, { Server, IncomingMessage, ServerOptions, ServerResponse } from 'http'
import http2, { Http2Server, SecureServerOptions } from 'http2'
import https from 'https'

import { router, Router } from '@devnetic/router'

export interface KiirusServer {
  listen: (port?: number, hostname?: string, listeningListener?: () => void) => void
  router: Router
  usage: () => string
}

interface InstanceOptions {
  http2?: boolean
  https?: SecureServerOptions
  keepAliveTimeout?: number
  logger?: boolean
}

// let server: Server | Http2Server
let serverIntance: Server | Http2Server

export const createServer = (options: InstanceOptions = {}, requestListener?: () => void): KiirusServer => {
  if (options.https) {
    if (options.http2) {
      const server: Http2Server = http2.createSecureServer(options.https, requestListener)

      setServerIntance(server)
    } else {
      const server: Server = https.createServer(options.https, requestListener)
      server.keepAliveTimeout = options.keepAliveTimeout ?? 5000

      setServerIntance(server)
    }
  } else if (options.http2) {
    const server: Http2Server = http2.createServer(requestListener)

    setServerIntance(server)
  } else {
    const server: Server = http.createServer(requestListener)
    server.keepAliveTimeout = options.keepAliveTimeout ?? 5000

    setServerIntance(server)
  }

  return {
    listen,
    router,
    usage
  }
}

const listen: (port?: number, hostname?: string, listeningListener?: () => void) => void = () => {
  serverIntance.listen(port, hostname, (error) => {
    if (error) {
      console.log('Something bad happened: %o', error)

      throw new Error(`Something bad happened ${error}`)
    }

    console.log(`Server is listening on host ${host} and port ${port}`)

    return serverIntance
  })

  let shuttingDown = false
  const signals = ['SIGINT', 'SIGTERM']

  signals.forEach(signal => {
    process.on(signal, () => {
      if (!shuttingDown) {
        console.log('Closing server')

        shuttingDown = true
        serverIntance.close()

        const timer = setTimeout(() => {
          console.log('Ending process')

          clearTimeout(timer)

          process.exit()
        }, 0)
      }
    })
  })
}

const usage = (): string => {
  return ''
}

const setServerIntance = (server: Server | Http2Server) : void => {
  serverIntance = server
}
