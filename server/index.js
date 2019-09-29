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

let username = null;
app.get('/c', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (username) {
        res.json(username);
    } else {
        res.json();
    }
});

app.post('/p', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Credentials', 'true');
        username = {username: "Sergey"};
        res.status(200);
        res.send();
});

const port = process.env.PORT || 80;


app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
