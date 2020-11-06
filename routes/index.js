const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const filter = require('./modules/filter')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

router.use('/filter', filter)
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/', home)

module.exports = router
