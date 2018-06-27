const passport = require('passport');
const debug = require('debug')('feattracker:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Store
  passport.serializeUser((user, done) => {
    debug('serialized user');
    done(null, user);
  });

  // Retrieve
  passport.deserializeUser((user, done) => {
    debug('deserialized user');
    done(null, user);
  });
};
