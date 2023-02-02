import { createLogger, format as _format, transports as _transports } from 'winston';

const format = _format;

const transports = {
    /**
     * We are using NPM log levels. Available NPM log levels are
     * error: 0
     * warn: 1
     * info: 2
     * http: 3
     * verbose: 4
     * debug: 5
     * silly: 6
     *
     * By default we are setting to warn.
     * you can override this setting by adding an environmental
     */
    console: new _transports.Console({
        level: process.env.LOG_LEVEL || 'debug',
    }),
};

const logger = createLogger({
    // Logging just to console
    transports: [transports.console],

    /**
     * the following format will produce logs something like:
     * debug: log message here ...
     */
    format: format.combine(
        format.colorize(),
        // format.timestamp(),
        format.align(),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
        format.splat(),
        format.simple(),
    ),
});

export default logger;

/**
 * Exporting transports, so if needer we can chnage the
 * log levels dynamicallly
 * exports.transports = transports
 */
