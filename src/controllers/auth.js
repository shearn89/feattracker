const debug = require('debug')('feattracker:controllers:auth');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'featdb';
const colUsers = 'users';

function authController(nav) {
  function signUp(req, res) {
    const { email, password } = req.body;
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(dbUri);
        debug('connected to server');
        const db = client.db(dbName);
        debug('connected to mongo db');

        const col = db.collection(colUsers);
        const user = { email, password };

        const results = await col.insertOne(user);
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err);
      }
      client.close();
    }());
  }
  function getSignIn(req, res) {
    debug('sign in rendered');
    res.render('signIn', {
      nav,
      title: 'Sign In',
    });
  }
  function authenticate(req, res, next) {
    return passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })(req, res, next);
  }
  function getLogout(req, res) {
    debug('logout requested');
    req.logout(req.user);
    // res.locals.msg = { severity: 'warning', msg: 'You have been logged out.' };
    res.redirect('/');
  }
  function getProfile(req, res) {
    debug('profile rendered');
    res.json(req.user);
  }
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    signUp,
    getSignIn,
    authenticate,
    getLogout,
    getProfile,
    middleware,
  };
}

module.exports = authController;
