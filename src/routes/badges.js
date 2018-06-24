const express = require('express');
const sql = require('mssql');
// const debug = require('debug')('feattracker:badges');

const badgeRouter = express.Router();

function router(nav, title) {
  // Badge routing
  badgeRouter.route('/').get((req, res) => {
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query('select * from badges');
      res.render('badgeList', { nav, title, badges: recordset });
    }());
  });
  badgeRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from badges where id = @id');
        [req.book] = recordset;
        if (req.book == null) {
          res.status(404).render('error', { nav, title });
        }
        next();
      }());
    })
    .get((req, res) => {
      res.render('badge', { nav, title, badge: req.book });
    });
  return badgeRouter;
}

module.exports = router;
