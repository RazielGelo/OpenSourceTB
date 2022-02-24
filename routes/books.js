const express = require('express');
const router = express.Router();
// Import PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Import framework for error handling
const { body, validationResult } = require('express-validator')

// Render Add Book
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('add_book.pug')
})

// Render Books
router.get('/', (req, res) => {
	res.render('books.pug')
})

// Add Book
router.post('/add',
	body('title', 'Title is required').notEmpty(),
	body('body', 'Body is required').notEmpty(),
	async (req, res) => {
		try {
			// Get Errors
			let errors = validationResult(req)

			if (errors) {
				res.render('add_book', {
					errors: errors
				})
			} else {
				let newBook = await prisma.book.create({
					data: {
						title: req.body.title,
						body: req.body.body,
						author: {
							connect: {
								id: req.user.id
							}
						}
					}
				})
				req.flash('success', 'Book successfully created');
				res.redirect('/');
			}
		} catch (e) {
			res.send(e);
		}

	})


// Access Control
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('danger', 'Please login');
		res.redirect('/users/login');
	}
}

module.exports = router