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
  badgeRouter.route('/:id').get((req, res) => {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request.input('id', sql.Int, id)
        .query('select * from badges where id = @id');
      res.render('badge', { nav, title, badge: recordset[0] });
    }());
  });

  return badgeRouter;
}

module.exports = router;
