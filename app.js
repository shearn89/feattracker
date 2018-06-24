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

// Routes
const badgeRouter = express.Router();

// Static files
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, staticDir)));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

badgeRouter.route('/')
  .get((req, res) => {
    res.send('hello badges');
  });
badgeRouter.route('/single')
  .get((req, res) => {
    res.send('hello single badges');
  });

app.use('/badges', badgeRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'FeatTracker',
      nav: [
        { link: '/badges', title: 'Badges' },
        { link: '/users', title: 'Users' },
      ],
    },
  );
});

// run dis.
app.listen(port, () => debug(`App listening on port ${chalk.green(port)}`));
