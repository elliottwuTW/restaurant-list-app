/**
 * check user's access authority
 */
module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('warning_msg', 'Please log in')
    return res.redirect('/users/login')
  }
  next()
}
