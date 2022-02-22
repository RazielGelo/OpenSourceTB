// For .env to work, we need this
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Initialization of Frameworks
const express = require('express')
const app = express()
const path = require('path');

// Passport related Frameworks
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// Middleware
app.use(express.json()) // Setup server to accept JSON
app.use(express.urlencoded({ extended: false })) // Setup server to accept form data

/* ================PASSPORT RELATED==================== */

// Express Session Middleware
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {		
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']'
		}

		return	{
			param: formParam,
			msg: msg,
			value: value
		}
	}
}))
  
// Passport Config
require('./middleware/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
  
app.get('*', function (req, res, next) {
	res.locals.user = req.user || null
	next()
})

/* ======================================================= */


// Routes
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')
// const loginRouter = require('./routes/login')
// const registerRouter = require('./routes/register')


// Use route
app.use('/users', userRouter)
app.use('/', indexRouter)
// app.use('/login', loginRouter)
// app.use('/register', registerRouter)
app.use(express.static(path.join(__dirname, 'public')));

// Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Listen to Server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`)    
} )