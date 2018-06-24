const express = require('express');

const badgeRouter = express.Router();

function router(nav, title) {
  const badges = [{
    title: 'Presenter',
    desc: 'Gave a presentation',
    image: 'present.png',
  }, {
    title: 'Coworker',
    desc: 'Worked with another department',
    image: 'coworker.png',
  }, {
    title: 'Traveller',
    desc: 'Travelled abroad for work',
    image: 'traveller.png',
  }];

  // Badge routing
  badgeRouter.route('/').get((req, res) => res.render('badgeList', { nav, title, badges }));
  badgeRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('badge', { nav, title, badge: badges[id] });
  });

  return badgeRouter;
}

module.exports = router;
