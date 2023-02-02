'use strict';

import cors from '@koa/cors';
import debug from 'debug';
import config from '../../config/index.js';
const corsDebug = debug('koa:cors')


/**
 * Return middleware to support CORS(Cross-Origin Resource Sharing).
 *
 * @param {Object} [options={}] - Optional configuration.
 * @param {string[]} [options.origins] - A list of allowed origins for the `Access-Control-Allow-Origin` header.
 * @return {function} Koa middleware.
 */
export default (options = {}) => {
  corsDebug('Cors Middleware');

  const { origins = ['*'] } = options;

  corsDebug('Initialize `origins`: ', origins);

  function verifyOrigin(ctx) {
    const origin = ctx.headers.origin;
    if (!originIsValid(origin)) return false;
    return origin;
  }
  function originIsValid(origin) {
    return config.middlewares.allowedDomains?.split(",").indexOf(origin) != -1;
  }

  return cors({
    ...options,
        exposedHeaders: [
        "X-CSRF-TOKEN"
      ],
      credentials: true,
    origin: verifyOrigin
  });
};
