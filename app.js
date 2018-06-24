// Entrypoint to the app.
// requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('feattracker:app');
const morgan = require('morgan');
const path = require('path');

// app setup
const app = express();
app.use(morgan('tiny'));

// Var setup
const viewsDir = 'views';
const staticDir = 'public';

// Static files
app.use(express.static(path.join(__dirname, staticDir)));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// routing
const badge = require('./routes/badge');

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, viewsDir, 'index.html')));
app.get('/', (req, res) => res.render('index', { title: 'FeatTracker', list: ['a', 'b'] }));
app.get('/badges/:badgeId?*', badge.get);
app.post('/badges/:badgeId?*', badge.post);

// env vars
const port = process.env.NODE_PORT || 3000;

// run dis.
app.listen(port, () => debug(`App listening on port ${chalk.green(port)}`));
