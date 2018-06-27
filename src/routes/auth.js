const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('feattracker:auth');
const passport = require('passport');

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'featdb';
const colUsers = 'users';

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
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
    });
  authRouter.route('/signIn')
    .get((req, res) => {
      debug('sign in rendered');
      res.render('signIn', {
        nav,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      debug('profile rendered');
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
