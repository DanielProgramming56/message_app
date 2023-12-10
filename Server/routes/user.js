const express = require('express')
const route = express.Router()
const { getAllUser, registerUser, loginUser, editProfile } = require('../controllers/user')
const authGuard = require('../middleware/auth')

route.get('/', getAllUser)
route.post('/sign-up', registerUser)
route.post('/login', loginUser)
route.put('/update_user/:id', authGuard, editProfile)
module.exports = route
