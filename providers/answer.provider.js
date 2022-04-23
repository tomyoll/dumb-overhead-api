const { MODELS } = require('../constants');
const { Provider } = require('./super');

class AnswerProvider extends Provider {
  constructor() {
    super(MODELS.ANSWER);
  }
}

module.exports = new AnswerProvider();
