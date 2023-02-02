import CommonService from './common/index.mjs';

/**
 * Class that serves as a container for all the controllers in the application.
 *
 * @class Controller
 */
export default class Controller {
    constructor() {
        // Register All Controller Here
        this.common = new CommonService();
    }
}
