const express = require('express');
const router = express.Router();
// Import PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Import framework for error handling
const { body, validationResult } = require('express-validator')

// Render Add Book
router.get('/add', ensureAuthenticated, async (req, res) => {
	const distinctGenre = await prisma.book.findMany({
		distinct: ['genre'],
		select: {
		  genre: true,
		},
	  })
	res.render('add_book.pug', { distinctGenre })
})

// Add Book
router.post('/add', ensureAuthenticated,
	body('title', 'Title is required').notEmpty(),
	body('genre', 'Genre is required').notEmpty(),
	async (req, res) => {
		console.log(req.body.genre)
		const user = req.user;
		console.log(user)
		try {
			// Get Errors
			let errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.render('add_book', {
					errors: errors.array(),
					user: user
				})
			} else {
				let newBook = await prisma.book.create({
					data: {
						title: req.body.title,
						genre: req.body.genre,
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

// Get Single book
router.get('/:id', async (req, res) => {	
	const book = await prisma.book.findUnique({
		where: {
			id: parseInt(req.params.id)
		}
	})
	const user = await prisma.user.findUnique({
		where: {
			userName: book.authorName
		}
	})
	const page = await prisma.page.findMany({
		where: {
			bookID: book.id
		}
	})
	if (user) {
		res.render('books.pug', {
			book: book,
			page: page,
			author: user.userName
		})
	}
})

// Get single page
router.get('/page/:id', async (req, res) => {	
	const page = await prisma.page.findUnique({
		where: {
			id: parseInt(req.params.id)
		}
	})	
	const book = await prisma.book.findUnique({
		where: {
			id: page.bookID
		}
	})
	const user = await prisma.user.findUnique({
		where: {
			userName: book.authorName
		}
	})
	if (user) {
		res.render('page.pug', {
			book: book,
			page: page,
			author: user.userName
		})
	}
})

// Add Page
router.post('/:id', ensureAuthenticated,
	body('chapterName', 'Chapter Name should not be empty').notEmpty(),
	body('pageNumber', 'Page number should not be empty').notEmpty(),
	body('body', 'Page should not be empty').notEmpty(),
	async (req, res) => {
		const book = await prisma.book.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		})
		const page = await prisma.page.findMany({
			where: {
				bookID: book.id
			}
		})
		const user = req.user
		console.log(user)
		try {			
			// Get Errors
			let errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.render('books', {
					errors: errors.array(),
					user: user,					
					book: book,
					page: page,
					author: user.userName
				})
			} else {
				let newPage = await prisma.page.create({
					data: {
						chapterName: req.body.chapterName,
						pageNumber: parseInt(req.body.pageNumber),
						body: req.body.body,
						book: {
							connect: {
								id: parseInt(req.params.id)
							}
						}
					}
				})
				console.log(newPage)
				req.flash('success', 'page successfully created');
				res.redirect('/');
			}
		} catch (e) {
			res.send(e);
		}

	})

async function checkPageNumber(req, res, next) {
	const page = await prisma.page.findMany({
		where: {
			bookID: parseInt(req.params.id)
		}
	})
	return next()
}

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