// connects it to the 
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = 8000 // process.env.PORT || 5000
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()

//connect to database
connectDB()

// adding piece of middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// use postman to check the status
app.get('/', (req, res) => {
    res.status(200).json({message: 'support desk api'})
})

// routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

// server started on this port
app.listen(PORT, () => console.log("Server started on ${PORT}"))