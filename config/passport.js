const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // Local strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    // Verifying function
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // No user with this email
          if (!user) {
            return done(null, false, req.flash('login_msg', 'User not found'))
          }
          // Passwords check
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

  // FB strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json

    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user)
        }
        // No this email yet
        const randomPassword = Math.random().toString(36).slice(8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
      })
      .catch(err => done(err, null))
  }
  ))

  // Session
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
