const { MODELS } = require('../constants');
const { Provider } = require('./super');

class RoleProvider extends Provider {
  constructor() {
    super(MODELS.ROLE);
  }
}

module.exports = new RoleProvider();
