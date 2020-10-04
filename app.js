// Include the modules and files needed in Node.js
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')

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

// Set GET routing
app.get('/', (req, res) => { // Main page
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
