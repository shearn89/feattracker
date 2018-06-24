// Entrypoint to the app.
// requires
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('feattracker:app');
const morgan = require('morgan');
const path = require('path');

// app setup
const app = express();

// Var setup
const staticDir = 'public';

// env vars
const port = process.env.NODE_PORT || 3000;

// Static files
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, staticDir)));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));

// Dynamic views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Nav
const nav = [
  { link: '/badges', title: 'Badges' },
  { link: '/users', title: 'Users' },
];
const title = 'FeatTracker';

// Routes
const badgeRouter = require('./src/routes/badges')(nav, title);

app.use('/badges', badgeRouter);
app.get('/', (req, res) => res.render('index', { nav, title }));
app.get('*', (req, res) => res.status(404).render('error', { nav, title }));

// START THE SHOW!
app.listen(port, () => debug(`App listening on port ${chalk.green(port)}`));
