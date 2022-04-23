const security = require('../helpers/security');
const badRequest = require('../helpers/badRequests');
const userProvider = require('../providers/user.provider');
const CONSTANTS = require('../constants/');

class UserService {
  async registerUser(userName, password) {
    const existingUser = await userProvider.getSingle({ userName }, { _id: 1, userName: 1 });

    if (existingUser) {
      throw badRequest.UserNameInUse({ status: 400 });
    }

    const hashPassword = security.generateHash(password);

    const createParams = {
      userName,
      password: hashPassword,
      role: CONSTANTS.ROLES.USER,
    };

    createParams.accessToken = security.token(createParams, CONSTANTS.TOKEN_DURATION);

    const user = await userProvider.createSingle(createParams);

    return user;
  }

  async loginUser(userName, password) {
    const user = await userProvider.getSingle({ userName });

    if (!user) {
      throw badRequest.SignInError();
    }

    if (user.password !== security.generateHash(password)) {
      throw badRequest.SignInError({ message: 'Incorrect Username or Password combination' });
    }

    const userId = user._id;

    const accessToken = await security.token({
      _id: userId,
      role: user.role,
    });

    const refreshToken = await security.token({ userId }, CONSTANTS.REFRESH_TOKEN_DURATION);

    const updatedUser = await userProvider.getSingleAndUpdate(
      { _id: userId },
      { accessToken, refreshToken },
      { new: true }
    );

    updatedUser.password = undefined;

    return updatedUser;
  }

  async logout(userId) {
    await userProvider.updateSingleById(userId, { accessToken: '', refreshToken: '' });
  }

  async getUsers() {}
}

module.exports = new UserService();
