const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')

// Register Form
router.get('/register', async (req, res) => {
	res.render('register.pug');
})

// Register Proccess
router.post('/register', async (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const username = req.body.username
	const password = req.body.password
	const password2 = req.body.password2
  
	req.checkBody('firstName', 'Firstname is required').notEmpty()
	req.checkBody('lastName', 'Lastname is required').notEmpty()
	req.checkBody('birthday', 'Birthday is required').notEmpty()
	req.checkBody('email', 'Email is required').notEmpty()
	req.checkBody('email', 'You have entered an invalid email address. Please try again.').isEmail();
	req.checkBody('password', 'Password is required').notEmpty()
	req.checkBody('password', 'Password must contain at least 8 characters.').len(8)
	req.checkBody('password2', 'Password did not match').equals(req.body.password)
	
  
	let errors = req.validationErrors()
  
	if (errors) {
	  res.render('register.pug', {
		errors: errors
	  });
	} else {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
	  	const newUser = new User({
			  firstName: req.body.firstName,
			  lastName: req.body.lastName,
			  birthday: req.body.birthday,
			  email: req.body.email,
			  password: hashedPassword
	  })
	  newUser.save()
	  req.flash('success', 'You are now registered and can log in')
	  res.redirect('/users/login')
	}
  })

  // Login Form
router.get('/login', async (req, res) => {
	res.render('login.pug')
})

// New User Form
  // Login Form
router.get('/new', async (req, res) => {
	res.render('new.pug')
})

// Login Process
router.post('/login', async (req, res, next) => {
	passport.authenticate('local', {
	  successRedirect: '/users/new',
	  failureRedirect: '/users/login',
	  failureFlash: true
	})(req, res, next)
})

// logout
router.get('/logout', async (req, res) => {
	req.logout()
	req.flash('success', 'You are logged out')
	res.redirect('/users/login')
})
  
  module.exports = router
  