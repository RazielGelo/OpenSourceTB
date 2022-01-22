// Import Framework
const express = require('express')
const router = express.Router()

// Link to models/users.js
const User = require('../models/user.js')

// CREATE
router.post('/', async (req, res) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		birthday: req.body.birthday
	})

	try {
		const newUser = await user.save()
		// Status 201 means successfully created an object
		res.status(201).json(newUser)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// SELECT ALL
router.get('/', async (req, res) => {
	try {
		const user = await User.find()
		// if successful send all subscriber data to user
		res.json(user)
	} catch (err) {
		// sends error to the user
		res.status(500).json({ message: err.message })
	}

})

// SELECT ONE
router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
})

// MIDDLEWARE (REUSABLE FUNCTION)

async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user'})
		}
	} catch (error) {
		return res.status(500).json({message: error.message})
	}
	res.user = user
	next()
}

// Creating one
router.post('/', async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel
	})

	try {
		const newSubscriber = await subscriber.save()
		// Status 201 means successfully created an object
		res.status(201).json(newSubscriber)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// UPDATE
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.email != null) {
		res.user.email = req.body.email
	}
	if (req.body.password != null) {
		res.user.password = req.body.password
	}
	if (req.body.firstName != null) {
		res.user.firstName = req.body.firstName
	}
	if (req.body.lastName != null) {
		res.user.lastName = req.body.lastName
	}
	if (req.body.birthday != null) {
		res.user.birthday = req.body.birthday
	}

	try {
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
})

// DELETE
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({message: 'Deleted successfully'})
	} catch (error) {
		res.status(500).json({message: err.message })
	}
})




module.exports = router;