import { getParams } from '@devnetic/cli'

import * as server from './server'

const params = getParams()

process.env.PORT = params.p ?? (params.port ?? 3000)
process.env.HOST = params.H ?? (params.host ?? '::')

if (params.help !== undefined || params.h !== undefined) {
  console.log(server.usage())

  process.exit()
}

export = {
  ...server
}
