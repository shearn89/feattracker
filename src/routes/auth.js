const express = require('express');

const authController = require('../controllers/auth');

const authRouter = express.Router();

function router(nav) {
  const {
    signUp,
    getSignIn,
    authenticate,
    getLogout,
    getProfile,
    middleware,
  } = authController(nav);
  authRouter.route('/signUp')
    .post(signUp);
  authRouter.route('/signIn')
    .get(getSignIn)
    .post(authenticate);
  authRouter.route('/logout')
    .get(getLogout);
  authRouter.route('/profile')
    .all(middleware)
    .get(getProfile);
  return authRouter;
}

module.exports = router;
