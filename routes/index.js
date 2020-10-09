const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const filter = require('./modules/filter')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/filter', filter)
router.use('/restaurants', restaurants)

module.exports = router
