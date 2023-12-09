const express = require('express')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const api = require('./routes/api')
// Application
const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", api)

// port 
const port = process.env.PORT
connectDB()

app.listen(port, ()  => console.log(`Your application is running in PORT: ${port}`))
