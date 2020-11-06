const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    // 驗證函式
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // 無此使用者
          if (!user) {
            return done(null, false, req.flash('login_msg', 'User not found'))
          }

          // 確認密碼
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, req.flash('login_msg', 'Password not correct'))
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, null))
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
