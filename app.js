// Include the modules and files needed in Node.js
const express = require('express')

// Create the Express app
const app = express()
const port = 3000

// Set GET routing
app.get('/', (req, res) => {
  res.send('project init')
})

// Start and listen to the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}!`)
})
