require('dotenv').config();

require('./helpers/db').connect();

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./helpers/logger');
const router = require('./routes');

const SERVER_PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static')));

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(router);

// eslint-disable-next-line no-console
app.listen(SERVER_PORT, () =>
  logger.system(`♂️ ♂️ ♂️  Server is running on port ${SERVER_PORT} ♂️ ♂️ ♂️`)
);
