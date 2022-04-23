const CONSTANTS = require('../constants/index');
const security = require('./security');
const badRequests = require('./badRequests');
const userProvider = require('../providers/user.provider');

class AuthHelper {
  async getUserByToken(token) {
    if (!token) {
      return null;
    }

    const userFromToken = await security.verify(token);

    if (!userFromToken) {
      throw badRequests.UnAuthorize();
    }

    if (userFromToken._id && userFromToken.role && userFromToken.userName) {
      userFromToken.token = token;

      return userFromToken;
    }

    const user = await userProvider.getSingleById(userFromToken._id, { role: 1, userName: 1 });

    if (!user) {
      throw badRequests.NotFound({ target: 'user' });
    }

    user.token = token;

    user.uId = user._id;

    return user;
  }

  async getUser(req) {
    const token = this.getTokenFromRequest(req);

    if (!token) {
      throw badRequests.UnAuthorize();
    }

    const user = await this.getUserByToken(token);

    if (!user) {
      throw badRequests.UnAuthorize();
    }

    return user;
  }

  getTokenFromRequest({ headers, query, body, method }) {
    let authorizationHeader = headers.Authorization || headers.authorization;

    if (!authorizationHeader) {
      if (method === CONSTANTS.METHODS.QUERY_TYPED) {
        authorizationHeader = query.authorization || query.Authorization;
      } else if (CONSTANTS.METHODS.BODY_TYPED_ARRAY.indexOf(method) >= 0) {
        authorizationHeader = body.authorization || body.Authorization;
      }
    }

    if (!authorizationHeader || !authorizationHeader.match('Bearer')) {
      return null;
    }

    return authorizationHeader.split(' ')[1];
  }

  async refreshToken({ headers }) {
    const { refreshToken } = headers;

    const refreshData = await security.verify(refreshToken);

    if (!refreshToken || !refreshData) {
      throw badRequests.UnAuthorize();
    }

    const user = await userProvider.getSingleById(refreshData.userId, { role: 1 });

    const token = await security.token({
      _id: user._id,
      role: user.role,
    });

    const data = {
      token,
      refreshToken: await security.token({ userId: user._id }, CONSTANTS.REFRESH_TOKEN_DURATION),
    };

    return data;
  }
}

module.exports = new AuthHelper();
