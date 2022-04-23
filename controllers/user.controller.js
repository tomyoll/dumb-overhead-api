const badRequests = require('../helpers/badRequests');
const userService = require('../services/user.service');
const CONSTANTS = require('../constants/');

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { userName, password } = req.body;

      if (!password || !userName) {
        throw badRequests.NotEnParams({ reqParams: 'userName and password' });
      }

      if (!CONSTANTS.VALIDATION.PASSWORD.test(password)) {
        throw badRequests.Error({
          message:
            'Password must have at least 6 characters. Password must contain one special character and one number',
        });
      }

      const user = await userService.registerUser(userName, password);

      user.password = undefined;

      return res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { userName, password } = req.body;

      if (!userName || !password) {
        throw badRequests.NotEnParams({ reqParams: 'username or password' });
      }

      const user = await userService.loginUser(userName, password);

      return res.status(200).json({ user });
    } catch (e) {
      res.status(400);

      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      await userService.logout(req.uId);
    } catch (e) {
      next(e);
    }
  }

  static async getUsers(req, res, next) {
    try {
    } catch (e) {
      res.status(400);

      next(e);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const { uId, userName, role } = req;

      res.status(200).json({ _id: uId, userName, role });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
