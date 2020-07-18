import { ServerResponse } from 'http'

export class Response {
  /**
   * @param {ServerResponse} response
   */
  constructor (private readonly response: ServerResponse) {
  }
}
