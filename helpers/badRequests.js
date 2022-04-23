function BadRequestModule() {
  const DEFAULT_ERROR_NAME = 'Error';
  const DEFAULT_ERROR_MESSAGE = 'error';
  const DEFAULT_ERROR_STATUS = 400;

  const NOT_ENOUGH_PARAMS = 'Not enough incoming parameters.';
  const INVALID_EMAIL = 'Incorrect email address.';
  const EMAIL_IN_USE = 'Email in use. Please input another email address.';
  const NICKNAME_IN_USE = 'User name in use. Please input another User name.';

  function Errors(options) {
    Error.captureStackTrace(this);

    if (options && options.name) {
      this.name = options.name;
    } else {
      this.name = DEFAULT_ERROR_NAME;
    }

    if (options && options.message) {
      this.message = options.message;
    } else {
      this.message = DEFAULT_ERROR_MESSAGE;
    }

    if (options && options.status) {
      this.status = options.status;
    } else {
      this.status = DEFAULT_ERROR_STATUS;
    }
  }

  Errors.prototype = Object.create(Error.prototype);

  /**
   * NotEnParams
   * @param {Object} options
   * @param {String} options.name Error name
   * @param {String} options.message Error message
   * @param {String} options.reqParams Request parameter
   * @returns
   */
  this.NotEnParams = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'NotEnoughIncomingParameters';
    }

    if (!errOptions.message) {
      errOptions.message = NOT_ENOUGH_PARAMS;
    }

    if (options && options.reqParams) {
      errOptions.message += `This parameters are required: ${options.reqParams}`;
    }

    return new Errors(errOptions);
  };

  this.InvalidEmail = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'InvalidEmail';
    }

    if (!errOptions.message) {
      errOptions.message = INVALID_EMAIL;
    }

    return new Errors(errOptions);
  };

  this.EmailInUse = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'DoubledEmail';
    }

    if (!errOptions.message) {
      errOptions.message = EMAIL_IN_USE;
    }

    return new Errors(errOptions);
  };

  this.UserNameInUse = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'DoubledUserName';
    }

    if (!errOptions.message) {
      errOptions.message = NICKNAME_IN_USE;
    }

    return new Errors(errOptions);
  };

  this.InvalidValue = (options) => {
    let errOptions;
    let errMessage;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'InvalidValue';
    }

    if (!errOptions.message) {
      errMessage = 'Invalid value';

      if (errOptions.value) {
        errMessage += ` "${options.value}" `;
      }

      if (errOptions.param) {
        errMessage += ` for "${options.param}"`;
      }

      errOptions.message = errMessage;
    }

    return new Errors(errOptions);
  };

  this.NotFound = (options) => {
    let errOptions;
    let errMessage;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'NotFound';
    }

    if (!errOptions.message) {
      errMessage = 'Not Found';

      if (errOptions.target) {
        errMessage += ` ${errOptions.target}`;
      }

      if (errOptions.searchParams) {
        errMessage += ` (${errOptions.searchParams})`;
      }

      errOptions.message = errMessage;
    }

    if (!errOptions.status) {
      errOptions.status = 404;
    }

    return new Errors(errOptions);
  };

  this.UnconfirmedEmail = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'UnconfirmedEmail';
    }

    if (!errOptions.message) {
      errOptions.message = 'Please confirm your account';
    }

    if (!errOptions.status) {
      errOptions.status = 400;
    }

    return new Errors(errOptions);
  };

  /**
   * Error
   * @param {*} options
   * @param {String} name Error name
   * @param {String} message Error message
   * @param {String} status Error status
   * @returns
   */
  this.Error = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'CustomError';
    }

    if (!errOptions.message) {
      errOptions.message = 'Something goes wrong!';
    }

    if (!errOptions.status) {
      errOptions.status = 400;
    }

    return new Errors(errOptions);
  };

  this.SignInError = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'SignInError';
    }

    if (!errOptions.message) {
      errOptions.message = 'Incorrect Username or password';
    }

    if (!errOptions.status) {
      errOptions.status = 400;
    }

    return new Errors(errOptions);
  };

  this.BlockedAccount = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'BlockedAccount';
    }

    if (!errOptions.message) {
      errOptions.message = 'Your account was blocked!';
    }

    return new Errors(errOptions);
  };

  this.UserNotExist = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'UserNotExist';
    }

    if (!errOptions.message) {
      errOptions.message = `User with this userName don't exist`;
    }

    return new Errors(errOptions);
  };

  this.AccessError = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'AccessError';
    }

    if (!errOptions.message) {
      errOptions.message = 'You do not have sufficient rights';
    }

    if (!errOptions.status) {
      errOptions.status = 403;
    }

    return new Errors(errOptions);
  };

  this.UnAuthorize = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'UnAuthorized';
    }

    if (!errOptions.message) {
      errOptions.message = 'You are not authorized';
    }

    if (!errOptions.status) {
      errOptions.status = 401;
    }

    return new Errors(errOptions);
  };

  this.NeedToken = (options) => {
    let errOptions;

    if (options) {
      errOptions = options;
    } else {
      errOptions = {};
    }

    if (!errOptions.name) {
      errOptions.name = 'NeedAuthorizationToken';
    }

    if (!errOptions.message) {
      errOptions.message = 'Need authorization token';
    }

    if (!errOptions.status) {
      errOptions.status = 401;
    }

    return new Errors(errOptions);
  };
}

module.exports = new BadRequestModule();
