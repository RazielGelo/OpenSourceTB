// // Import Framework
// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt') // required for encrypting

// // Link to models/users.js
// const User = require('../models/user.js')

// // CREATE
// router.post('/', async (req, res) => {
// 	try {
// 		const salt = await bcrypt.genSalt()
// 		const hashedPassword = await bcrypt.hash(req.body.password, salt)
// 		console.log(salt)	
// 		console.log(hashedPassword)

// 		const user = new User({
// 			email: req.body.email,
// 			password: hashedPassword,
// 			firstName: req.body.firstName,
// 			lastName: req.body.lastName,
// 			birthday: req.body.birthday
// 		})

// 		const newUser = await user.save()
// 		// Status 201 means successfully created an object
// 		res.status(201).json(newUser)

// 	} catch (error) {
// 		res.status(400).json({ message: error.message })
// 	}	
	
// })

// // SELECT ALL
// router.get('/', async (req, res, next) => {
// 	try {
// 		const user = await User.find()
// 		// if successful send all subscriber data to user
// 		res.json(user)
// 	} catch (err) {
// 		// sends error to the user
// 		res.status(500).json({ message: err.message })
// 	}

// })

// // SELECT ONE THRU ID
// // router.get('/:id', getUser, (req, res) => {
// // 	res.json(res.user)
// // })

// router.get('/:email', getUserEmail, (req, res) => {
// 	res.send(res.email)
// })

// // MIDDLEWARE (Get User by ID)

// async function getUser(req, res, next) {
// 	let user
// 	try {
// 		user = await User.findById(req.params.id)
// 		if (user == null) {
// 			return res.status(404).json({ message: 'Cannot find user'})
// 		}
// 	} catch (error) {
// 		return res.status(500).json({message: error.message})
// 	}
// 	res.user = user
// 	next()
// }

// // MIDDLEWARE (Get User by Email)
// async function getUserEmail(req, res, next) {
// 	let email
// 	try {
// 		email = await User.findOne({ email: req.params.email }, {_id: 0, email: 1})
// 		if (email == null) {
// 			return res.status(404).json({ message: 'Cannot find email'})
// 		}
// 	} catch (error) {
// 		return res.status(500).json({message: error.message})
// 	}
// 	res.email = email
// 	next()
	
// }

// // UPDATE
// router.patch('/:id', getUser, async (req, res) => {
// 	if (req.body.email != null) {
// 		res.user.email = req.body.email
// 	}
// 	if (req.body.password != null) {
// 		res.user.password = req.body.password
// 	}
// 	if (req.body.firstName != null) {
// 		res.user.firstName = req.body.firstName
// 	}
// 	if (req.body.lastName != null) {
// 		res.user.lastName = req.body.lastName
// 	}
// 	if (req.body.birthday != null) {
// 		res.user.birthday = req.body.birthday
// 	}

// 	try {
// 		const updatedUser = await res.user.save()
// 		res.json(updatedUser)
// 	} catch (error) {
// 		res.status(400).json({message: error.message})
// 	}
	
// })

// // DELETE
// router.delete('/:id', getUser, async (req, res) => {
// 	try {
// 		await res.user.remove()
// 		res.json({message: 'Deleted successfully'})
// 	} catch (error) {
// 		res.status(500).json({message: err.message })
// 	}
// })




// module.exports = router;