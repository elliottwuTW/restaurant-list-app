const express = require('express')
const router = express.Router()

// Model
const Restaurant = require('../../models/restaurant')
const sortOptions = require('../../models/sortOptions.json')

router.get('/', (req, res) => { // Main page
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' }) // ascending by name by default
    .then(restaurants => res.render('index', { restaurants, sortOptions }))
    .catch(err => console.error(err))
})

module.exports = router
