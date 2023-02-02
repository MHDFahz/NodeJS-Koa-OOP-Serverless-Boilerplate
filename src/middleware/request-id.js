'use strict';
import crypto from 'crypto';
import debug from 'debug';
const koaRequestId = debug('koa:request-id');

/**
 * Return middleware that gets an unique request id from a header or
 * generates a new id.
 *
 * @param {Object} [options={}] - Optional configuration.
 * @param {string} [options.query] - Request query name to get the forwarded request id.
 * @param {string} [options.header=X-Request-Id] - Request header name to get the forwarded request id.
 * @param {string} [options.exposeHeader=X-Request-Id] - Response header name.
 * @param {function} [options.generator=crypto.randomBytes(16).toString("hex")] - Id generator function.
 * @return {function} Koa middleware.
 */
export default (options = {}) => {
    const uid = crypto.randomBytes(16).toString('hex');
    const {
        query = null,
        header = 'X-Request-Id',
        exposeHeader = 'X-Request-Id',
        generator = uid,
    } = options;

    koaRequestId('Request ID Middleware');

    return async function requestId(ctx, next) {
        const reqId =
            (query && ctx.query[query]) ||
            (header && ctx.get(header)) ||
            generator;
        koaRequestId(`reqId=${reqId}`);

        ctx.id = reqId;
        ctx.state.reqId = reqId;

        if (exposeHeader) {
            koaRequestId(
                `Expose the request id via headers['${exposeHeader}']`,
            );
            ctx.set(exposeHeader, reqId);
        }

        await next();
    };
};
