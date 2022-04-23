const { Schema, model } = require('mongoose');

const CONSTANTS = require('../constants/');

const schema = new Schema(
  {
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    role: { type: Number, ref: CONSTANTS.MODELS.ROLE },
  },
  {
    collection: 'User',
  }
);

module.exports = model(CONSTANTS.MODELS.USER, schema);
