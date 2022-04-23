const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const CONSTANTS = require('../constants/');

const schema = new Schema(
  {
    title: { type: String, default: '' },
    author: {
      type: {
        id: String,
        userName: String,
      },
      ref: CONSTANTS.MODELS.USER,
    },
    createdAt: { type: Date, default: Date.now() },
    answers: { type: [ObjectId], default: [] },
    payload: { type: String, default: '' },
  },
  {
    collection: 'Question',
  }
);

module.exports = model(CONSTANTS.MODELS.QUESTION, schema);
