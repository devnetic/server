const { getParams } = require('@devnetic/cli')

const server = require('./src/server')

const params = getParams()

console.log(params)

process.env.PORT = params.p || params.port || 3000
process.env.HOST = params.H || params.host || '::'

if (params.help || params.h) {
  console.log(server.usage())

  process.exit()
}

module.exports = {
  ...server
}
