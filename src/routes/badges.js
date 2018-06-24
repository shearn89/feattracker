const express = require('express');

const badgeRouter = express.Router();

const badges = [{
  title: 'Presenter',
  desc: 'Gave a presentation',
  image: 'present.png',
}];

// Badge routing
badgeRouter.route('/')
  .get((req, res) => {
    res.render(
      'badges',
      {
        title: 'FeatTracker',
        nav: [
          { link: '/badges', title: 'Badges' },
          { link: '/users', title: 'Users' },
        ],
        badges,
      },
    );
  });
badgeRouter.route('/single')
  .get((req, res) => {
    res.send('hello single badges');
  });

module.exports = badgeRouter;
