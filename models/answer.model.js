const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const CONSTANTS = require('../constants/');

const schema = new Schema(
  {
    payload: { type: String, default: '' },
    author: {
      type: {
        userName: String,
        _id: ObjectId,
      },
      default: '',
      ref: CONSTANTS.MODELS.USER,
    },
    question: { type: ObjectId, ref: CONSTANTS.MODELS.QUESTION },
    likes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
  },
  {
    collection: 'Answer',
  }
);

module.exports = model(CONSTANTS.MODELS.ANSWER, schema);
