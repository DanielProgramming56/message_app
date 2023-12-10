const express = require('express')
const route = express.Router()
const {getAllUser, registerUser, loginUser} = require('../controllers/user')


route.get('/', getAllUser)
route.post('/sign-up', registerUser)
route.post('/login', loginUser)

module.exports = route
