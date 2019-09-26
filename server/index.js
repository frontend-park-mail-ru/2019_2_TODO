'use strict'

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(body.json());
app.use(cookie());


app.post('/signup', function (req, res) {return res.status(404).json({error: "err"});});

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});