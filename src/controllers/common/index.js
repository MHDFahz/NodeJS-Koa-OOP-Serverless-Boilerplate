import UntilService from '../../utils/index.js';

export default class CommonService extends UntilService {
    constructor() {
        super();
        this.getinital = this.getinital.bind(this);
        this.getPing = this.getPing.bind(this);
    }

    /**
     * @param {import('koa').Context} ctx The Koa Context
     */
    async getinital(ctx) {
        ctx.response.body = 'ok';
    }

    /**
     * @param {import('koa').Context} ctx The Koa Context
     */
    async getPing(ctx) {
        ctx.throw(new this.NotImplementedError('Some Error Occur'));
    }
}
