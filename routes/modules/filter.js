const express = require('express')
const router = express.Router()

// Model
const Restaurant = require('../../models/restaurant')
const sortOptions = require('../../models/sortOptions.json')

router.get('/', (req, res) => { // Filter restaurants by keyword and sort option
  const { keyword, option } = req.query
  let matchedRestaurants = []

  const sortKey = sortOptions[option].key
  const sortMethod = sortOptions[option].method

  Restaurant.find()
    .lean()
    .sort({ [sortKey]: sortMethod })
    .then(restaurants => {
      matchedRestaurants = restaurants.filter(restaurant =>
        (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) ||
        (restaurant.name_en.toLowerCase().includes(keyword.toLowerCase())) ||
        (restaurant.category.includes(keyword)) ||
        (restaurant.location.includes(keyword))
      )
      res.render('index', {
        restaurants: matchedRestaurants,
        keyword,
        sortOptions,
        targetOption: option
      })
    })
    .catch(err => console.error(err))
})

module.exports = router
