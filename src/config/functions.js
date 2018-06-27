// Can I abstract this out somehow?
function protect(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = protect;
