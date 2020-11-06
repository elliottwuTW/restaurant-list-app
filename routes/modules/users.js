const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

const checkLoginInfo = require('../../middleware/checkLoginInfo')
const checkRegisterInfo = require('../../middleware/checkRegisterInfo')

// 登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// 提交登入
router.post('/login', checkLoginInfo,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

// 提交註冊
router.post('/register', checkRegisterInfo,
  (req, res) => {
    const name = req.body.name || ''
    const { email, password } = req.body

    User.findOne({ email })
      .then(user => {
        // email 已註冊
        if (user) {
          return res.render('register', {
            name,
            email,
            errors: [{ msg: 'The input email is already registered' }]
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
  }
)

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功')
  res.redirect('/users/login')
})

module.exports = router
