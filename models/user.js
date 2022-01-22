const mongoose = require('mongoose')

// Schema
const userSchema = new mongoose.Schema({
	email: {	
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: true,
	},
	dateCreated: {
		type: Date,
		required: true,
		default: Date.now()
	}
})

module.exports = mongoose.model('Users', userSchema)

/*
birthday: {
	type: Date,
	required: true,
}, */

