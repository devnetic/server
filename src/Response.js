class Response {
  /**
   * @param {ServerResponse} response
   */
  constructor (response) {
    this.response = response
  }

  /**
   *
   * @param {string} data
   * @param {number} [statusCode=200]
   * @param {string} [contentType='application/json']
   */
  send (data = '', statusCode = 200, contentType = 'text/plain', encoding = 'utf-8') {
    this.response.setHeader('Content-Type', contentType)
    this.response.write(data, encoding)
    this.response.end()
  }

  json (data = {}, statusCode = 200, encoding = 'utf-8') {
    this.send(JSON.stringify(data), statusCode, 'application/json', encoding)
  }
}

module.exports = Response
