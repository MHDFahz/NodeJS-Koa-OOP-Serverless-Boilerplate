import UntilService from "../utils/index.js";
/**
 * LogResponceMiddleware class is a middleware class that logs the response time for each HTTP request.
 * It extends the UntilService class from the ../utils/index.js module to access the logger.
 * @class LogResponceMiddleware
 * @extends UntilService
 */
class LogResponceMiddleware extends UntilService {
  /**
   * Creates a new instance of the LogResponceMiddleware class.
   * Calls the super() method to inherit the properties and methods from the UntilService class.
   * Binds the logResponseTime method to the LogResponceMiddleware instance.
   * @constructor
   */
  constructor() {
    super();
    this.logResponseTime = this.logResponseTime.bind(this);
  }
  /**
   * A middleware function that logs the response time for each HTTP request.
   * Gets the start time of the request using Date.now().
   * Calls the next() function to pass control to the next middleware in the chain.
   * Gets the end time of the request using Date.now().
   * Calculates the difference between the start and end times to get the response time in milliseconds.
   * Logs the HTTP method, URL, and response time using the logger from the UntilService class.
   * @param {import("koa").Context} ctx - The Koa context object.
   * @param {Function} next - The next middleware in the chain.
   * @returns {Promise<void>} A Promise that resolves when the middleware is finished.
   */
  async logResponseTime(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    this.logger.http(`\x1b[32m${ctx.method} ${ctx.url} - ${ms}ms\x1b[0m`);
  }
}

/**
 * Exports a singleton instance of the LogResponceMiddleware class.
 * @type {Function}
 * @default
 */
export default new LogResponceMiddleware().logResponseTime;
