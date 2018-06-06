var express = require('express');
var chalk = require('chalk');

var app = express();

var badge = require('./routes/badge');

app.get('/', () => res.send('Hello World!'))
app.get('/badges/:badgeId?*', badge.get);
app.post('/badges/:badgeId?*', badge.post);

var port = process.env.NODEJS_PORT || 3000;

app.listen(port, () => console.log('Example app listening on port '+port))
