const express = require('express');
const badgeController = require('../controllers/badges');

const badgeRouter = express.Router();

function router(nav) {
  const {
    getIndex,
    getById,
    protectRoute,
  } = badgeController(nav);
  badgeRouter.use(protectRoute);
  badgeRouter.route('/')
    .get(getIndex);
  badgeRouter.route('/:id')
    .get(getById);
  return badgeRouter;
}
module.exports = router;
