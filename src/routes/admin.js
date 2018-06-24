const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('feattracker:admin');

const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'featdb';
const colBadges = 'badges';

const adminRouter = express.Router();

const exampleBadges = [
  {
    title: 'Presenter',
    desc: 'Give a presentation.',
    image: 'presenter.png',
  }, {
    title: 'Traveller',
    desc: 'Travel abroad for work.',
    image: 'traveller.png',
  }, {
    title: 'Coworker',
    desc: 'Work with another team',
    image: 'coworker.png',
  },
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(dbUri);
          debug('connected to server');
          const db = client.db(dbName);
          debug('connected to mongo db');
          const response = await db.collection(colBadges).insertMany(exampleBadges);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
