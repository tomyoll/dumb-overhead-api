const winston = require('winston');

const { format, transports } = winston;

const getTransport = (options) => {
  const transport = [];

  if (process.env.NODE_ENV === 'development') {
    transport.push(new transports.Console({ format: format.simple() }));
  }

  if (process.env.NODE_ENV !== 'development') {
    delete options.type;

    transport.push(new transports.File(options));
  }

  return transport;
};

module.exports = new (class Logger {
  constructor() {
    this.options = {
      handleExceptions: true,
      maxFiles: 10,
      colorize: false,
      prettyPrint: true,
      format: format.simple(),
    };

    this.infoLogger = winston.createLogger({
      transports: getTransport({
        level: 'info',
        filename: `logs/cluster_out.log`,
        ...this.options,
      }),
      exitOnError: false,
    });

    this.errorLogger = winston.createLogger({
      transports: getTransport({
        level: 'error',
        filename: `logs/cluster_err.log`,
        ...this.options,
      }),
      exitOnError: false,
    });

    this.systemLogger = winston.createLogger({
      transports: getTransport({
        type: 'system',
        level: 'info',
        filename: `logs/cluster_out.log`,
        ...this.options,
      }),
      exitOnError: false,
    });
  }

  system(message) {
    return this.systemLogger.info(message);
  }

  info(message) {
    if (!this.infoLogger) {
      return;
    }

    return this.infoLogger.info(message);
  }

  error(opts) {
    let message;

    if (typeof opts === 'string') {
      message = opts;
    } else {
      message = opts.stack || opts.message;
    }

    return this.errorLogger.error(message);
  }

  infoStream() {
    return {
      write: (message) => {
        this.infoLogger.info(message);
      },
    };
  }

  errorStream() {
    return {
      write: (...opts) => {
        this.errorLogger.error(...opts);
      },
    };
  }
})();
