const { Schema, model } = require('mongoose');

const CONSTANTS = require('../constants/');

const schema = new Schema(
  {
    value: { type: String, unique: true, default: 'USER' },
  },
  {
    collection: 'Role',
  }
);

module.exports = model(CONSTANTS.MODELS.ROLE, schema);
