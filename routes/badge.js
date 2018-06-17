// badge.js
// ========
const debug = require('debug')('feattracker:routes:badge');

const badges = [];

function process(req, res, next, method) {
  if (!req.params.badgeId) {
    debug(`${method}/badges`);
    res.json(badges);
  } else {
    debug(`${method} /badges/${req.params.badgeId}`);
    res.send(`${method} /badges/${req.params.badgeId}`);
  }
  next();
}

module.exports = {
  get(req, res, next) {
    process(req, res, next, 'get');
  },
  post(req, res, next) {
    process(req, res, next, 'post');
  },
};
