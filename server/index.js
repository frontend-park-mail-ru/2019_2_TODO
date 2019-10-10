'use strict';

const fallback = require('express-history-api-fallback');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();

const rootDir = path.resolve(__dirname, '..', 'src');

app.use(morgan('dev'));
app.use(express.static(rootDir));
app.use(body.json());
app.use(cookie());
app.use(fallback('index.html', {root: rootDir}));

const allowedOrigins = [
  'localhost',
  'http://93.171.139.196:780/'
];

const CORS_HEADERS = {
  requestedHeaders: 'Access-Control-Request-Headers'.toLowerCase(),
  requestedMethod: 'Access-Control-Request-Method'.toLowerCase(),

  allowOrigin: 'Access-Control-Allow-Origin'.toLowerCase(),
  allowMethods: 'Access-Control-Allow-Methods'.toLowerCase(),
  allowHeaders: 'Access-Control-Allow-Headers'.toLowerCase(),
  allowCredentials: 'Access-Control-Allow-Credentials'.toLowerCase(),
};

app.use(function (req, res, next) {
  const requestOrigin = req.headers['origin'];

  if (typeof requestOrigin !== 'undefined') {
    const requestOriginHostname = url.parse(requestOrigin).hostname;

    const requestedHeaders = req.headers[CORS_HEADERS.requestedHeaders];
    const requestedMethod = req.headers[CORS_HEADERS.requestedMethod];

    console.log(`CORS-запрос с домена ${requestOriginHostname}`, {requestedHeaders, requestedMethod});

    const headers = [];
    if (requestedHeaders) {
      headers.push([CORS_HEADERS.allowHeaders, requestedHeaders]);
    }
    if (requestedMethod) {
      headers.push([CORS_HEADERS.allowMethods, 'GET, POST, OPTIONS']);
    }

    if (allowedOrigins.includes(requestOriginHostname)) {
      headers.push([CORS_HEADERS.allowOrigin, requestOrigin]);
      headers.push([CORS_HEADERS.allowCredentials, 'true']);
    }

    const result = headers.map(pair => '\t' + pair.join(': ')).join('\n');
    console.log(`Response with headers:\n` + result);

    headers.forEach(([name, value]) => res.setHeader(name, value));
  }
  next();
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
