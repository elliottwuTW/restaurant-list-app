const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const restaurantStyles = require('../../models/restaurantStyle')

// Create a new restaurant page
router.get('/new', (req, res) => {
  res.render('new', { restaurantStyles })
})

// Read a specific restaurant info
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})

// Modify restaurant info page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant, restaurantStyles }))
    .catch(err => console.error(err))
})

router.post('/', (req, res) => {
  const newRestaurantInfo = { ...Object.assign({}, req.body), ...{ userId: req.user._id } }

  Restaurant.create(newRestaurantInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// Update the restaurant info
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const updatedRestaurant = { ...Object.assign({}, req.body), ...{ userId } }

  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      Object.assign(restaurant, updatedRestaurant)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.error(err))
})

// Delete the specific restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
