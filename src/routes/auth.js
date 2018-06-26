const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('feattracker:auth');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user
      res.json(req.body);
    });
  return authRouter;
}

module.exports = router;
