/// <reference types="node" />
import { ServerResponse } from 'http';
export declare class Response {
    private readonly response;
    /**
     * @param {ServerResponse} response
     */
    constructor(response: ServerResponse);
}
