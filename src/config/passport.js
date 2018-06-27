const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Store
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieve
  passport.deserializeUser((user, done) => {
    // find user by id?
    done(null, user);
  });
};
