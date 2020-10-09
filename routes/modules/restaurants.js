const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const restaurantStyles = require('../../models/restaurantStyle')

// GET
router.get('/new', (req, res) => { // Render the page that can create a new restaurant
  res.render('new', { restaurantStyles })
})
router.get('/:id', (req, res) => { // Read a specific restaurant info
  const id = req.params.id

  // get the specific restaurant
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})
router.get('/:id/edit', (req, res) => { // Render the page that can update a specific restaurant info
  const id = req.params.id

  // get the specific restaurant
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, restaurantStyles }))
    .catch(err => console.error(err))
})

// POST
router.post('', (req, res) => {
  const newRestaurantInfo = Object.assign({}, req.body)

  // create a new restaurant
  Restaurant.create(newRestaurantInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// PUT
router.put('/:id', (req, res) => { // Update the restaurant info, and redirect to the main page
  const id = req.params.id
  const updatedRestaurant = Object.assign({}, req.body)

  // get the specific restaurant
  Restaurant.findById(id)
    .then(restaurant => {
      Object.assign(restaurant, updatedRestaurant)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.error(err))
})

// DELETE
router.delete('/:id', (req, res) => { // Delete the specific restaurant, and redirect to the main page
  const id = req.params.id

  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
