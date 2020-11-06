/**
 * check user's access authority
 */
module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('warning_msg', '請先登入')
    return res.redirect('/users/login')
  }
  next()
}
