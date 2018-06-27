const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('feattracker:badges');

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'featdb';
const colBadges = 'badges';

const badgeRouter = express.Router();

function router(nav, title) {
  // Badge routing
  badgeRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  badgeRouter.route('/').get((req, res) => {
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(dbUri);
        debug('connected to server');
        const db = client.db(dbName);
        debug('connected to mongo db');

        const col = await db.collection(colBadges);

        const badges = await col.find().toArray();
        res.render('badgeList', { nav, title, badges });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  badgeRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(dbUri);
          debug('connected to server');
          const db = client.db(dbName);
          debug('connected to mongo db');

          const col = await db.collection(colBadges);

          const badge = await col.findOne({ _id: new ObjectID(id) });
          debug(badge);
          res.render('badge', { nav, title, badge });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return badgeRouter;
}
module.exports = router;
