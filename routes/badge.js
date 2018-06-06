// badge.js
// ========
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
    console.log(method + '/badges');
    res.json(badges);
  } else {
    console.log(method + ' /badges/' + req.params.badgeId);
    res.send(method + ' /badges/' + req.params.badgeId);
  }
  next();
}
