// Include the modules and files needed in Node.js
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant.js')
const restaurantStyles = require('./models/restaurantStyle.json')

// Create the Express app
const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})

// Set the template engine
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  // Handlebars helper
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Set GET routing
app.get('/', (req, res) => { // Main page
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})
app.get('/search', (req, res) => { // Search restaurants by keyword
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
app.get('/restaurants/new', (req, res) => { // Render the page that can create a new restaurant
  res.render('new', { restaurantStyles })
})
app.get('/restaurants/:id', (req, res) => { // Read a specific restaurant info
  const id = req.params.id

  // get the specific restaurant
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})
app.get('/restaurants/:id/edit', (req, res) => { // Render the page that can update a specific restaurant info
  const id = req.params.id

  // get the specific restaurant
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, restaurantStyles }))
    .catch(err => console.error(err))
})

// Set POST routing
app.post('/restaurants', (req, res) => {
  const newRestaurantInfo = Object.assign({}, req.body)

  // create a new restaurant
  Restaurant.create(newRestaurantInfo)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})
app.put('/restaurants/:id', (req, res) => { // Update the restaurant info, and redirect to the main page
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
app.delete('/restaurants/:id', (req, res) => { // Delete the specific restaurant, and redirect to the main page
  const id = req.params.id

  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
