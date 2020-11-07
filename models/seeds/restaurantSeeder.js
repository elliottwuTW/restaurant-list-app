/**
 * Set the default restaurant seeds and write them to MongoDB
 */
const Restaurant = require('../restaurant')
const User = require('../user')

const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

// Mock user data
const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

// Mock restaurant data
const SEED_RESTAURANTS = require('../data/restaurant')

db.once('open', () => {
  const userPromise = []
  const restaurantPromise = []
  const userIds = []
  // 建立使用者
  SEED_USERS.forEach(seedUser => {
    const { name, email, password } = seedUser
    userPromise.push(
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => userIds.push(user._id))
        .catch(err => console.error(err))
    )
  })

  Promise.all(userPromise)
    .then(() => {
      // 建立餐廳
      SEED_RESTAURANTS.forEach((_, index) => {
        const userId = userIds[index]
        SEED_RESTAURANTS[index].forEach(restaurant => {
          const seedRestaurant = { ...restaurant, ...{ userId } }
          restaurantPromise.push(Restaurant.create(seedRestaurant))
        })
      })

      Promise.all(restaurantPromise)
        .then(() => console.log('Seed data successfully created!'))
        .then(() => process.exit())
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}
)
