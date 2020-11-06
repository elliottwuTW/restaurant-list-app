/**
 * check if submitted login information is valid
 */
module.exports = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.render('login', {
      email,
      password: '',
      errors: [{ msg: 'Please check email and password' }]
    })
  }
  next()
}
