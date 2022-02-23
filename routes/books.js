const express = require('express');
const router = express.Router();
// Import PrismaClient
const { PrismaClient, Prisma } = require('@prisma/client');
const { PrismaClientUnknownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient()

// Render Add Book
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('add_book.pug')
})

// Render Books
router.get('/', (req, res) => {
	res.render('books.pug')
})

// Add Book
router.post('/add', async (req, res) => {
	//let data = JSON.stringify(req.user)
	try {
		req.checkBody('title', 'Title is required').notEmpty();
		req.checkBody('body', 'Body is required').notEmpty();

		// Get Errors
		let errors = req.validationErrors();

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
      		res.redirect('/books');
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