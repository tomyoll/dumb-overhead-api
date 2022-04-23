const mongoose = require('mongoose');
const logger = require('./logger');

function connect() {
  mongoose
    .connect(
      process.env.DATABASE_CONNECTION_URI,
      {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      },
      null
    )
    .then(() => logger.system(`DATABASE CONNECTED: ${process.env.DATABASE_CONNECTION_URI}`));
}

module.exports = {
  connect,
  mongoose,
};
