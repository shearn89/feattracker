const express = require('express');
const badgeController = require('../controllers/badges');

const badgeRouter = express.Router();

function router(nav, title) {
  const {
    getIndex,
    getById,
    protectRoute,
  } = badgeController(nav, title);
  badgeRouter.use(protectRoute);
  badgeRouter.route('/')
    .get(getIndex);
  badgeRouter.route('/:id')
    .get(getById);
  return badgeRouter;
}
module.exports = router;
