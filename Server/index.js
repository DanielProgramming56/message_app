const express = require('express')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const api = require('./routes/api')
const { errorHandle, invalidRouteError } = require('./middleware/handleError')
const { messageConnection } = require('./chats/index')
// Application
const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", api)

app.use(invalidRouteError)
app.use(errorHandle)

// port 
const port = process.env.PORT
connectDB()
messageConnection()
app.listen(port, () => console.log(`Your application is running in PORT: ${port}`))
