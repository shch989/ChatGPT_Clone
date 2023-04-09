const express = require('express')

// router object
const router = express.Router()
const authController = require('../controllers/authController')

// routes
// Register
router.post('/register', authController.registerController)

// Login
router.post('/login', authController.loginController)

// Logout
router.post('/logout', authController.logoutController)

module.exports = router
