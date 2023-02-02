import Koa from "koa";
import UntilService from "../../utils/index.js";

export class CommonService extends UntilService {
  constructor() {
    super();
    this.getinital = this.getinital.bind(this);
    this.getPing = this.getPing.bind(this);
  }
  /**
   * @param {Koa.Context} ctx The Koa Context
   */
  async getinital(ctx) {
    ctx.response.body = "ok";
  }
  /**
   * @param {Koa.Context} ctx The Koa Context
   */
  async getPing(ctx) {
    ctx.throw(new this.NotImplementedError("Some Error Occur"));
  }
}
