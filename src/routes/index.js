import Router from 'koa-router';
import common from './common/index.js';

/**
 * Class that creates and manages the Koa Router.
 *
 * @class RouterService
 */
export default class RouterService {
  /**
   * Creates a new RouterService instance.
   * @constructor
   */
  constructor() {
    /**
     * The Koa Router instance.
     * @member {import("koa-router").Router}
     */
    this.router = new Router();
    this.api = new Router();

    // register all Routers here
    this.api.use(common);

    // Starting endpoint "/api" for router
    this.router.use('/api', this.api.routes());
  }

  /**
   * Returns the Koa Router instance.
   *
   * @returns {import("koa-router").Router} The Koa Router instance.
   */
  getRouter() {
    return this.router;
  }
}
