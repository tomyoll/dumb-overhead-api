const { MODELS } = require('../constants');
const { Provider } = require('./super');

class QuestionProvider extends Provider {
  constructor() {
    super(MODELS.QUESTION);
  }
}

module.exports = new QuestionProvider();
