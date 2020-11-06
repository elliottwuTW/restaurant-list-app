const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

// 提交註冊
router.post('/register', (req, res) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  const errors = []
  // 欄位確認
  if (!email || !password || !confirmPassword) {
    errors.push({ msg: 'All fields are necessary except for Name' })
  }
  if (password !== confirmPassword) {
    errors.push({ msg: 'Please confirm your passwords' })
  }

  if (errors.length > 0) {
    return res.render('register', {
      name,
      email,
      errors
    })
  }

  User.findOne({ email })
    .then(user => {
      // email 已註冊
      if (user) {
        errors.push({ msg: 'The input email is already registered' })
        return res.render('register', {
          name,
          email,
          errors
        })
      }

      // 建立使用者
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.error(err))
    })
})

module.exports = router
