// Entrypoint to the app.
// requires
var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('feattracker:app');
var morgan = require('morgan');
var path = require('path');

// app setup
var app = express();
app.use(morgan('tiny'));

var views_dir = 'views';

// routing
var badge = require('./routes/badge');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, views_dir, 'index.html'))
});
app.get('/badges/:badgeId?*', badge.get);
app.post('/badges/:badgeId?*', badge.post);

// env vars
var port = process.env.NODEJS_PORT || 3000;

// run dis.
app.listen(port, () => debug(`Example app listening on port ${chalk.green(port)}`));
