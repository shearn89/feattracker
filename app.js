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

// Var setup
var views_dir = 'views';
var static_dir = 'public';

// Static files
app.use(express.static(path.join(__dirname, static_dir)));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')))

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
