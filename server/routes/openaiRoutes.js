const express = require('express')
const openaiController = require('../controllers/openaiController')

const router = express.Router()

// route
router.post('/summary', openaiController.summaryController)

module.exports = router
