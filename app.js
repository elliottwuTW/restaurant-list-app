const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
const port = 3000

// Set the template engine
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  // Handlebars helper
  helpers: {
    ifEquals: function (targetItem, iteratedItem, options) {
      return (targetItem === iteratedItem) ? options.fn(this) : options.inverse(this)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
