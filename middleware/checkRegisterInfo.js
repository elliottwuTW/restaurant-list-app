/**
 * check if submitted register information is valid
 */
module.exports = (req, res, next) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  const errors = []
  // Fields check
  if (!email || !password || !confirmPassword) {
    errors.push({ msg: 'All fields are necessary except for Name' })
  }
  if (password !== confirmPassword) {
    errors.push({ msg: 'Please confirm your passwords' })
  }

  if (errors.length > 0) {
    return res.render('register', {
      name,
      email,
      errors
    })
  }
  next()
}
