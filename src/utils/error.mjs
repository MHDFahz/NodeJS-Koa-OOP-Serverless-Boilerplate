import { STATUS_CODES } from 'http';

class Errors extends Error {
    static toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            name: this.name,
        };
    }
}

/**
 * An error class representing an authentication error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class AuthenticationError extends Errors {
    constructor(message = STATUS_CODES[401]) {
        super(message);
        this.message = message;
        this.statusCode = 401;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * An error class representing an authorization error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class AuthorizationError extends Errors {
    constructor(message = STATUS_CODES[403]) {
        super(message);
        this.message = message;
        this.statusCode = 403;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * An error class representing a resource not found error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class NotFoundError extends Errors {
    constructor(message = STATUS_CODES[404]) {
        super(message);
        this.message = message;
        this.statusCode = 404;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * An error class representing a validation error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class ValidationError extends Errors {
    constructor(message = STATUS_CODES[422]) {
        super(message);
        this.message = message;
        this.statusCode = 422;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * An error class representing a server error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class ServerError extends Errors {
    constructor(message = STATUS_CODES[500]) {
        super(message);
        this.message = message;
        this.statusCode = 500;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * An error class representing a not implemented error.
 *
 * @class
 * @extends Errors
 * @param {string} [message] - The error message.
 * @since 1.0.0
 */
class NotImplementedError extends Errors {
    constructor(message = STATUS_CODES[501]) {
        super(message);
        this.message = message;
        this.statusCode = 501;

        this.name = this.constructor.name;
        Errors.captureStackTrace(this, this.constructor);
        // Call the toJSON method on the Error class
        this.toJSON = Errors.toJSON;
    }
}

/**
 * This module exports various error classes that can be used to represent HTTP errors in a Koa server application.
 * @module errors
 * @author Fahis <fahis.skazi@gmail.com>
 * @since 1.0.0
 * @license MIT
 */
export default {
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ServerError,
    NotImplementedError,
    ValidationError,
};
