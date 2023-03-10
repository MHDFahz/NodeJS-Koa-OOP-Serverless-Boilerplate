/**
 * A class for creating and configuring a Koa app.
 *
 * @author Fahis <fahis.skazi@gmail.com>
 *
 * @class App
 * @extends UntilService
 */
import Koa from 'koa';
import helmet from 'koa-helmet';
import serverless from 'serverless-http';
import bodyParser from './middleware/body-parser.mjs';
import cors from './middleware/cors.mjs';
import logResponseTime from './middleware/log-response-time.mjs';
import requestId from './middleware/request-id.mjs';
import RouterService from './routes/index.mjs';
import UntilService from './utils/index.mjs';

export default class App extends UntilService {
    /**
     * Constructor for the `App` class.
     * Creates a new instance of the Koa app, sets up middleware and routes, and starts the server.
     *
     * @constructor
     *
     * @throws {Error} If there is an error during the lifetime of the app.
     * @throws {MiddlewareError} If there is an error in the middleware chain.
     */
    constructor() {
        super();
        const app = new Koa();
        const routes = new RouterService().getRouter();

        app.use(helmet())
            .use(cors())
            .use(requestId())
            .use(
                bodyParser({
                    enableTypes: ['json'],
                    jsonLimit: '10mb',
                }),
            )
            .use(logResponseTime)
            /**
             * Event listener that handles errors that occur during the lifecycle of the Koa app.
             * Calls the `handleErrorResponse` function in the `utils` module to set the error response for the request, including the HTTP status code and response body.
             *
             * @param {Error} err - The error object.
             * @param {Object} ctx - The Koa context object.
             *
             * @returns {void}
             */
            .on('error', this.handleErrorResponse)
            /**
             * Middleware function that handles errors in the middleware chain.
             * Emits an 'error' event with the error and context, which can be handled by an error listener.
             *
             * @param {Object} ctx - The Koa context object.
             * @param {function} next - The next middleware function in the chain.
             *
             * @throws {MiddlewareError} If there is an error in the middleware chain.
             */
            .use(this.handleMiddleWareError)
            .use(routes.routes())
            .use(routes.allowedMethods());

        /**
         * Logs a message indicating the start of the registered routes.
         */
        this.logger.debug(
            '----------------- All Registered Routes ----------------',
        );
        /**
         * Iterates through the `routes.stack` array and logs information about each route.
         *
         * @param {Object} route - A route object from the `routes.stack` array.
         */
        routes.stack.forEach((route) => {
            const methods = route.methods
                .filter((method) => method !== 'HEAD')
                .join(', ');
            this.logger.debug(`${methods.padEnd(7)} ${route.path.padEnd(20)}`);
        });

        this.server = app.listen(this.config.PORT, () => {
            this.logger.info(`Koa Server Listening on ${this.config.PORT}`);
        });

        this.setUpSignalHandlers();

        this.handler = serverless(app);
    }
}
