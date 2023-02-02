import config from '../../config/index.js';
import Error from './error.js';
import logger from './logger.js';

export default class UntilService {
    constructor(){
        this.AuthenticationError = Error.AuthenticationError
        this.AuthorizationError = Error.AuthorizationError 
        this.NotFoundError = Error.NotFoundError 
        this.ServerError = Error.ServerError 
        this.NotImplementedError = Error.NotImplementedError 
        this.ValidationError = Error.ValidationError
        this.logger = logger   
        this.config = config 
    }

    /**
     * Handles the error response for a given error and context.
     * If the error has a `toJSON()` method, it will be used to set the response body.
     * Otherwise, a custom JSON object with the error message, name, and status code will be used.
     *
     * @param {Error} err - The error object.
     * @param {Object} ctx - The Koa context object.
     * @returns {number} The HTTP status code of the error response.
     * @see {@link https://github.com/koajs/koa/blob/master/docs/error-handling.md} for more information on error handling in Koa.js.
     * @since 1.0.0
     */
    handleErrorResponse = (err, ctx) => {
        ctx.status = err.statusCode || 500;
        if (typeof err.toJSON === 'function') {
            logger.error(err.message);
            ctx.body = err.toJSON();
            return ctx.status;
        } else {
            ctx.body = {
                message: err.message || 'Internal Server Error',
                name: err.name || 'Internal Server Error',
                status: err.statusCode || 500,
            };
            logger.error(err.message || 'Internal Server Error');
            console.log(ctx.body)
            return ctx.status;
        }
    };


    /**
     * Middleware function that handles errors in the middleware chain.
     * Emits an 'error' event with the error and context, which can be handled by an error listener.
     *
     * @param {Object} ctx - The Koa context object.
     * @param {function} next - The next middleware function in the chain.
     */
    handleMiddleWareError = async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.app.emit('error', error, ctx);
        }
    };
}