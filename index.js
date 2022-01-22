// For .env to work, we need this
require('dotenv').config()

// Initialization of Frameworks
const express = require('express')
const app = express()
const path = require('path');

// Initialization of Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewURLParser: true})

// Establish connection to database
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

// Setup server to accept JSON (Middleware)
app.use(express.json())

// Routes
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index');


// Use route
app.use('/users', userRouter)
app.use('/index', indexRouter)
app.use(express.static(path.join(__dirname, 'public')));

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Listen to Server
app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`))