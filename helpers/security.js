const jwt = require('jwt-simple');
const crypto = require('crypto');

const CONSTANTS = require('../constants');

const secret = process.env.JWT_SECRET;

module.exports.token = (payload, duration) => {
  const params = payload || {};
  const exp = duration || CONSTANTS.TOKEN_DURATION;

  const now = Date.now() / 1000;

  params.iat = Math.round(now);

  params.exp = Math.round(now + exp);

  const token = jwt.encode(params, secret);

  return token;
};

module.exports.verify = async (token) => {
  try {
    const decoded = await jwt.decode(token, secret);

    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports.generateHash = (password) => {
  const shaSum = crypto.createHash('sha256');

  shaSum.update(password);

  return shaSum.digest('hex');
};
