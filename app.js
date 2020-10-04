// Include the modules and files needed in Node.js
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Restaurant = require('./models/restaurant')

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
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

// Set the static files
app.use(express.static('public'))

// Set the body-parser
app.use(bodyParser.urlencoded({ extended: true }))

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
  res.render('new')
})

// Set POST routing
app.post('/restaurants', (req, res) => {
  const restaurantInfo = req.body

  // create a new restaurant
  Restaurant.create({
    name: restaurantInfo.name,
    name_en: restaurantInfo.name_en,
    category: restaurantInfo.category,
    image: restaurantInfo.image,
    location: restaurantInfo.location,
    phone: restaurantInfo.phone,
    google_map: restaurantInfo.google_map,
    rating: restaurantInfo.rating,
    description: restaurantInfo.description
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
