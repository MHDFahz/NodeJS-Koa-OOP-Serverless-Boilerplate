import Router from 'koa-router';
import RouterUtils from '../router.utils.js';

class CommonRoute extends RouterUtils {
  constructor() {
    super();
    this.router = Router();
    this.router.get('/', this.controller.common.getinital);
    this.router.get('/ping', this.controller.common.getPing);
  }

  getRoutes() {
    return this.router.routes();
  }
}

export default new CommonRoute().getRoutes();
