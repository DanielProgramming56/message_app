const express = require('express')
require('dotenv').config()
const connectDB = require('./config/connectDB')
// Application
const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// port 
const port = process.env.PORT
connectDB()

app.listen(port, ()  => console.log(`Your application is running in PORT: ${port}`))
