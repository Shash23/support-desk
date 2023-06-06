const express = require('express')
const router = express.Router()
const {} = require('../constrollers/userController')

router.post('/', registerUser)

router.post('/login', loginUser)

module.exports = router