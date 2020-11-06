const express = require('express')
const router = express.Router()

// Model
const Restaurant = require('../../models/restaurant')
const sortOptions = require('../../models/sortOptions.json')

router.get('/', (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants, sortOptions }))
    .catch(err => console.error(err))
})

module.exports = router
