// Include the modules and files needed in Node.js
const express = require('express')
const exphbs = require('express-handlebars')

// Create the Express app
const app = express()
const port = 3000

// Set the template engine
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

// Set the static files
app.use(express.static('public'))

// Set GET routing
app.get('/', (req, res) => {
  res.render('index')
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
