import { createServer, RequestListener } from 'http'

import { router } from '@devnetic/router'

const listen = (port?: number, hostname?: string): void => {
  const server = createServer(router.attach as RequestListener)

  server.listen(port, hostname, (): void => {
  })
}

const usage = (): string => {
  return ''
}

export {
  listen,
  usage
}
