'use strict';

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const rootDir = path.resolve(__dirname, '..', 'src');

app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());
app.use(fallback('index.html', {root: rootDir}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://93.171.139.195:780");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
