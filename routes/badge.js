// badge.js
// ========
var debug = require('debug')('feattracker:routes:badge');

module.exports = {
  get: function (req, res, next) {
    process(req, res, next, 'get');
  },
  post: function (req, res, next) {
    process(req, res, next, 'post');
  }
}

var badges = [];

var process = function (req, res, next, method) {
  if (!req.params.badgeId) {
    debug(method + '/badges');
    res.json(badges);
  } else {
    debug(method + ' /badges/' + req.params.badgeId);
    res.send(method + ' /badges/' + req.params.badgeId);
  }
  next();
}
