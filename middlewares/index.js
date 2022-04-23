const mongoose = require('mongoose');
const badRequests = require('../helpers/badRequests');
const logger = require('../helpers/logger');

const { ObjectId } = mongoose.Types;
const AuthHelper = require('../helpers/authHelper');

class Middlewares {
  // eslint-disable-next-line no-unused-vars
  static errorHandler(err, req, res, next) {
    const status = err.status || err.statusCode || 500;

    if (status >= 500) {
      logger.error(err);
    } else {
      logger.info(err);
    }

    res.status(status).send({ error: err.message });
  }

  static requireAuthorization(req, res, next) {
    const { uId: userId } = req;

    if (!userId) {
      return next(badRequests.UnAuthorize());
    }

    next();
  }

  static async authorization(req, res, next) {
    try {
      const user = await AuthHelper.getUser(req);

      if (user) {
        req.loggedIn = true;

        req.uId = new ObjectId(user._id);

        req.role = user.role;

        req.userName = user.userName;

        req.token = user.token;
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  static async adminAccess(req, res, next) {
    try {
      if (req.role !== 0) {
        throw badRequests.AccessError();
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Middlewares;
