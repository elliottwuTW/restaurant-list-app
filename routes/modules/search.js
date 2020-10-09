const express = require('express')
const router = express.Router()

// Model
const Restaurant = require('../../models/restaurant')

router.get('/search', (req, res) => { // Search restaurants by keyword
  const keyword = req.query.keyword
  let matchedRestaurants = []

  // Match the keyword with all data in MongoDB
  Restaurant.find()
    .lean()
    .then(restaurants => {
      matchedRestaurants = restaurants.filter(restaurant =>
        (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) ||
        (restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())) ||
        (restaurant.category.includes(keyword)) ||
        (restaurant.location.includes(keyword))
      )
      res.render('index', { restaurants: matchedRestaurants, keyword })
    })
})

module.exports = router
