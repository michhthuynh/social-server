const PORT = process.env.PORT || 5000;
const rfs = require('rotating-file-stream');
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));
const helmet = require('helmet');
const path = require('path');

const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
require('./utils/connectMongodb')();

const isProduction = process.env.NODE_ENV === 'production';

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs'),
});

app.use(
  isProduction
    ? morgan('combined', { stream: accessLogStream })
    : morgan('dev'),
);
app.use(helmet());

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => console.log(`This server is running at ${PORT}`));
