// For .env to work, we need this
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

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

// Middleware
app.use(express.json()) // Setup server to accept JSON
app.use(express.urlencoded({ extended: false })) // Setup server to accept form data


// Routes
// const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')


// Use route
// app.use('/users', userRouter)
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use(express.static(path.join(__dirname, 'public')));

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Listen to Server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`)    
} )