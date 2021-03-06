const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const fbAuth = require('./modules/fbAuth')

const authenticator = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', fbAuth)
router.use('/', authenticator, home)

module.exports = router
