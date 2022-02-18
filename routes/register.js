// // For .env to work, we need this
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt')

// // Link to models/users.js
// const User = require('../models/user.js')

// // Render Register page
// router.get('/', (req, res) => {
// 	res.render('register.pug')
// })


// // Register
// router.post('/', async (req, res) => {	
// 	try {
// 		const hashedPassword = await bcrypt.hash(req.body.password, 10) // Shortcut for password hashing without salt

// 		const user = new User({
// 			email: req.body.email,
// 			password: hashedPassword,
// 			firstName: req.body.firstName,
// 			lastName: req.body.lastName,
// 			birthday: req.body.birthday
// 		})	
	
// 		// When registration is successful code below executes
// 		const newUser = await user.save()
// 		// Status 201 means successfully created an object
// 		// res.status(201).send("Registration successful.")
// 		res.render('login.pug', { success: "Registration successful"})
// 		// res.redirect('/login')
// 	} catch (error) {
// 		// res.status(400).send("Registration failed, please try again.")
// 		res.render('register.pug', { error: "Registration failed, please try again"})
// 		// res.redirect('/register')
// 	}	
// })

// module.exports = router