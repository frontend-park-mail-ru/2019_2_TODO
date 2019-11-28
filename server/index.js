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

app.use(body.json());
app.use(cookie());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "/auth");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.static(rootDir));
app.use(fallback('index.html', {root: rootDir}));

const port = process.env.PORT || 8000;

app.listen(port, () => {
});
