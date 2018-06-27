const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('feattracker:local.strategy');

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'featdb';
const colUsers = 'users';

module.exports = function localStrategy() {
  debug('local strategy loaded');
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    debug('in local strategy, querying mongo');
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(dbUri);
        debug('connected to server');
        const db = client.db(dbName);
        debug('connected to mongo db');

        const col = db.collection(colUsers);
        const user = await col.findOne({ email });
        debug(user);

        if (user.password === password) {
          debug('successful login');
          done(null, user);
        } else {
          debug('failed login');
          done(null, false);
        }
      } catch (err) {
        debug(err);
      }
      client.close();
    }());
  }));
};
