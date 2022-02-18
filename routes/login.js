// // For .env to work, we need this
// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');

// // Link to models/users.js
// const User = require('../models/user.js')

// // Render Login Page
// router.get('/', (req, res) => {
// 	res.render('login.pug')
// })

// // router.get('/new', async (req, res) => {
// // 	const user = await User.findOne(req.body.email)
// // 	res.render('new.pug', {user})
// // })

// // Login
// router.post('/', async (req, res) => {
// 	const user = await User.findOne({email: req.body.email})
// 	if (user == null) {
// 		res.render('login.pug', { error: 'User email not found'})
// 	}
// 	try {
// 		if (await bcrypt.compare(req.body.password, user.password)) {
// 			res.render('new.pug', { user: user })
// 			//res.render('login.pug', { success: 'Login Successful'})
// 			console.log(`Name: ${user.firstName}, Password: ${user.password}`)		
// 		}
// 		else {
// 			res.render('login.pug', { error: 'Login unsuccessful'})
// 		}
		
// 	} catch (error) {
// 		res.status(500).send()
// 	}
// })


// module.exports = router