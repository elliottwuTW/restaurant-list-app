const express = require('express')
const router = express.Router()

const passport = require('passport')

// Request to FB for login
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// Callback for authentication using user info from FB
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
