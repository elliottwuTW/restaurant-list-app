const express = require('express')
const router = express.Router()

// Model
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => { // Main page
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

module.exports = router
