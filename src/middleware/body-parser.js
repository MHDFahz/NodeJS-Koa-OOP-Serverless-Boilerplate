'use strict';

import debug from 'debug';
import bodyParser from 'koa-bodyparser';
const koaDebug = debug('koa:bodyparser')

/**
 * Return middleware that parses HTTP request body.
 *
 * @param {Object} [options={}] - Optional configuration.
 * @return {function} Koa middleware.
 * @throws {InvalidRequestBodyFormat} When failed to parse the request body.
 */
export default (options = {}) => {
    koaDebug('Koa BodyParser Middleware');

    return bodyParser({
        ...options,
        onerror: () => {
        throw new Error('Invalid format is detected in the request body');
        }
    });
};
