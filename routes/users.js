const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
// const User = require('../models/user')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
	req.checkBody('firstName', 'Firstname should at least be 2 characters long').len(2)
	req.checkBody('lastName', 'Lastname is required').notEmpty()
	req.checkBody('lastName', 'Lastname should at least be 2 characters long').len(2)
	req.checkBody('birthday', 'Birthday is required').notEmpty()
	req.checkBody('email', 'Email is required').notEmpty()
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty()
	req.checkBody('password', 'Password must have 8 characters').len(8)
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password)


	let errors = req.validationErrors()

	if (errors) {
		res.render('register.pug', {
			errors: errors
		})
	}
	else {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email.toLowerCase()
			},
			select: {
				email: true
			}
		})

		if (user != null) {
			req.flash('failure', 'Email is already registered, please use a different email')
			res.redirect('/users/register')
		}
		else {
			const newUser = await prisma.user.create({
				data: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					birthday: new Date(req.body.birthday),
					email: req.body.email.toLowerCase(),
					password: hashedPassword
				}
			})
			req.flash('success', 'You are now registered and can log in')
			res.redirect('/users/login')			
		}
	}
})
// Login Form
router.get('/login', async (req, res) => {
	res.render('login.pug')
})

// New User Form
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
	req.flash('success', 'You are successfully logged out')
	req.flash('success', 'Thanks for using OpenSource TextBook!')
	res.redirect('/users/login')
})

module.exports = router


