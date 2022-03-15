const express = require('express');
const router = express.Router();
// Import PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Import framework for error handling
const { body, validationResult } = require('express-validator');
const e = require('connect-flash');

// Render all books API returning JSON data
router.get('/all', async (req, res) => {
	const books = await prisma.book.findMany({})
	res.json(books)
})

// Render Add Book
router.get('/add', ensureAuthenticated, async (req, res) => {	
	const distinctGenre = await prisma.genre.findMany({
		distinct: ['genre'],
		select: {
			genre: true,
		},
		orderBy: {
			genre: 'asc'
		}
	})
	res.render('add_book.pug', { distinctGenre})
})

// Render Book Genre
router.get('/genre', ensureAuthenticated, async (req, res) => {
	res.render('add_genre.pug')
})

// Render Book Modify
router.get('/modify/:id', ensureAuthenticated, async (req, res) => {
	const book = await prisma.book.findUnique({
		where: {
			id: parseInt(req.params.id)
		}
	})
	const distinctGenre = await prisma.genre.findMany({
		distinct: ['genre'],
		select: {
			genre: true,
		},
		orderBy: {
			genre: 'asc'
		}
	})
	res.render('modify_book.pug', { distinctGenre, book })
})

// Render Page Modify
router.get('/page/modify/:id', ensureAuthenticated, async (req, res) => {
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
	res.render('modify_page.pug', { page, book })
})

// Render Page conflict
router.get('/page/conflict/:id', ensureAuthenticated, async (req, res) => {
	const page = await prisma.page.findUnique({
		where: {
			id: parseInt(req.params.id)
		}
	})
	res.render('modify_page_conflict.pug', { page })
})

// Render Delete Book
router.get('/delete/:id', ensureAuthenticated, async (req, res) => {
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
		},
		orderBy: {
			pageNumber: 'asc'
		}
	})
	const genre = await prisma.genre.findFirst({
		where: {
			id: book.genreID
		}
	})
	res.render('delete_book.pug', { book, user, page, genre })
})

// // Render request access
// router.get('/request/:id', ensureAuthenticated, async (req, res) => {
// 	const book = await prisma.book.findUnique({
// 		where: {
// 			id: parseInt(req.params.id)
// 		}
// 	})
// 	res.render('request_access.pug', { book })
// })

// Add Genre
router.post('/genre', ensureAuthenticated,
	body('genre', 'Genre is required').notEmpty(),
	body('genre').custom(async (value, { req }) => {
		value = await prisma.genre.findMany({})
		value.forEach((genre) => {
			if (genre.genre === req.body.genre) {
				throw new Error('Genre already exist, add a new one or just cancel')

			}
			return true;
		})
	}),
	async (req, res) => {
		const user = req.user;
		try {
			// Get Errors
			let errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.render('add_genre', {
					errors: errors.array(),
					user: user
				})
			} else {
				let newGenre = await prisma.genre.create({
					data: {
						genre: req.body.genre
					}
				})
				req.flash('success', 'Genre successfully created');
				res.redirect('/books/add');
			}
		} catch (e) {
			res.send(e);
		}

	})

// Add Book
router.post('/add', ensureAuthenticated,
	body('title', 'Please add a title for your book').notEmpty(),
	body('genre', 'Please choose or add a genre for your book').notEmpty(),
	body('description', 'Please add a brief description of your book').notEmpty(),
	body('description', 'Please limit your description to 200 characters').isLength({ max: 200 }),
	async (req, res) => {
		const distinctGenre = await prisma.genre.findMany({
			distinct: ['genre'],
			select: {
				genre: true,
			},
			orderBy: {
				genre: 'asc'
			}
		})
		const title = req.body.title
		const description = req.body.description
		const link = req.body.link
		const user = req.user;
		const genre1 = req.body.genre
		console.log(description)
		try {
			// Get Errors
			let errors = validationResult(req)
			const genre = await prisma.genre.findFirst({
				where: {
					genre: req.body.genre
				}
			})
			if (!errors.isEmpty()) {
				res.render('add_book', {
					errors: errors.array(),
					user: user,
					distinctGenre: distinctGenre,
					title: title,
					description: description,
					link: link,
					genre1: genre1
				})
			} else {
				let newBook = await prisma.book.create({
					data: {
						title: req.body.title,
						genreID: genre.id,
						description: req.body.description,
						link: req.body.link,
						author: {
							connect: {
								id: req.user.id
							}
						}
					}
				})
				req.flash('success', 'Book successfully created');
				res.redirect('/users/profile');
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
		},
		include: {
			histories: true
		},
		orderBy: {
			pageNumber: 'asc'
		}
	})
	const genre = await prisma.genre.findFirst({
		where: {
			id: book.genreID
		}
	})
	if (user) {
		res.render('books.pug', {
			book: book,
			page: page,
			genre: genre,
			author: user.userName
		})
	}
})

// Modify Book
router.post('/modify/:id', ensureAuthenticated,
	body('title', 'Title is required').notEmpty(),
	body('description', 'Please add a brief description of your book').notEmpty(),
	body('description', 'Please limit your description to 200 characters').isLength({ max: 255 }),
	ensureAuthenticated, async (req, res) => {
		const book = await prisma.book.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		})
		const distinctGenre = await prisma.genre.findMany({
			distinct: ['genre'],
			select: {
				genre: true,
			},
			orderBy: {
				genre: 'asc'
			}
		})
		const user = req.user;
		let errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.render('modify_book.pug', {
				errors: errors.array(),
				user: user,
				book: book,
				distinctGenre: distinctGenre
			})
		}
		else {
			// This code can be refined
			try {
				const genre = await prisma.genre.findFirst({
					where: {
						genre: req.body.genre
					}
				})
				const updateBook = await prisma.book.update({
					where: {
						id: parseInt(req.params.id)
					},
					data: {
						title: req.body.title,
						genreID: genre.id,
						description: req.body.description,
					}
				})
				req.flash('success', 'Book updated Successfully')
				res.redirect(`/books/${req.params.id}`)

			} catch (e) {
				res.send(e)
			}
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
	const genre = await prisma.genre.findFirst({
		where: {
			id: book.genreID
		}
	})
	const history = await prisma.history.findMany({
		where: {
			pageID: parseInt(req.params.id)
		}
	})
	const allUser = await prisma.user.findMany({
		select: {
			id: true,
			userName: true
		}
	})
	if (user) {
		res.render('page.pug', {
			book: book,
			page: page,
			genre: genre,
			author: user.userName,
			history: history,
			allUser: allUser
		})
	}
})

// Add Page
router.post('/:id', ensureAuthenticated,
	body('chapterName', 'Chapter name should not be empty').notEmpty(),
	body('pageNumber', 'Page number should not be empty').notEmpty(),
	body('pageNumber').custom((value, { req }) => {
		value = parseInt(req.body.pageNumber)
		if (value <= 0 || value > 10000) {
			throw new Error('Page number should be between 1 and 10000')
		}
		return true;
	}),
	body('pageNumber').custom(async (value, { req }) => {
		value = await prisma.page.findMany({
			where: {
				bookID: parseInt(req.params.id)
			}
		})
		value.forEach((page) => {
			if (page.pageNumber === parseInt(req.body.pageNumber)) {
				throw new Error('Page number already exists')

			}
			return true;
		})
	}),
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
			},
			orderBy: {
				pageNumber: 'asc'
			},
			include: {
				histories: true
			}
		})
		const genre = await prisma.genre.findFirst({
			where: {
				id: book.genreID
			}
		})
		const user = req.user
		try {
			// Get Errors
			let errors = validationResult(req)
			let prevBody = req.body.body
			let prevChapter = req.body.chapterName
			let prevPageNumber = req.body.pageNumber
			if (!errors.isEmpty()) {
				res.render('books', {
					errors: errors.array(),
					user: user,
					book: book,
					page: page,
					genre: genre,
					author: user.userName,
					prevBody: prevBody,
					prevChapter: prevChapter,
					prevPageNumber: prevPageNumber
				})
			} else {
				let newPage = await prisma.page.create({
					data: {
						chapterName: prevChapter,
						pageNumber: parseInt(prevPageNumber),
						body: prevBody,
						lastUpdatedBy: user.id,
						book: {
							connect: {
								id: parseInt(req.params.id)
							}
						}
					}
				})
				req.flash('success', 'Page successfully created');
				res.redirect(`/books/${book.id}`);
			}
		} catch (e) {
			res.send(e);
		}

	})

// Approve Requests
router.post('/page/:id', ensureAuthenticated, async (req, res) => {
	const page = await prisma.page.findUnique({
		where: {
			id: parseInt(req.params.id)
		}
	})

	const relatedHistory = await prisma.history.findMany({
		where: {
			pageRef: parseInt(req.params.id)
		},
		select: {
			id: true
		}
	})

	try {
		const clearHistory = await prisma.book.update({
			where: {
				id: page.bookID
			},
			data: {
				histories: {
					disconnect: relatedHistory
				}
			}
		})
		const updatePage = await prisma.page.update({
			where: {
				id: parseInt(req.params.id)
			},
			data: {
				chapterName: req.body.chapterName1,
				pageNumber: parseInt(req.body.pageNumber1),
				body: req.body.currBody,
				lastUpdatedBy: parseInt(req.body.updater),
				histories: {
					set: []
				}
			}
		})
		req.flash('success', 'Page update request approved successfully')
		res.redirect(`/books/page/${req.params.id}`)

	} catch (e) {
		res.send(e)
	}
})

// Modify Page
router.post('/page/modify/:id', ensureAuthenticated,
	body('chapterName', 'Chapter name is required').notEmpty(),
	body('pageNumber', 'Page number is required').notEmpty(),
	body('pageNumber').custom((value, { req }) => {
		value = parseInt(req.body.pageNumber)
		if (value <= 0 || value > 10000) {
			throw new Error('Page number should be between 1 and 10000')
		}
		return true;
	}),
	body('pageNumber').custom(async (value, { req }) => {
		const currentPage = await prisma.page.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		})
		value = await prisma.page.findMany({
			where: {
				bookID: currentPage.bookID
			}
		})
		value.forEach((page) => {
			if (currentPage.pageNumber !== parseInt(req.body.pageNumber)) {
				if (page.pageNumber === parseInt(req.body.pageNumber)) {
					throw new Error('Page number already exists')

				}
			}
			return true;
		})
	}),
	body('body', 'Content is required').notEmpty(),
	async (req, res) => {
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
		const relatedHistory = await prisma.history.findMany({
			where: {
				pageRef: parseInt(req.params.id)
			},
			select: {
				id: true
			}
		})
		const user = req.user;
		let errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.render('modify_page.pug', {
				errors: errors.array(),
				page: page,
				user: user,
				book: book
			})
		}
		else {
			if (user.userName === book.authorName) {				
				try {
					const clearHistory = await prisma.book.update({
						where: {
							id: page.bookID
						},
						data: {
							histories: {
								disconnect: relatedHistory
							}
						}
					})
					const updatePage = await prisma.page.update({
						where: {
							id: parseInt(req.params.id)
						},
						data: {
							chapterName: req.body.chapterName,
							pageNumber: parseInt(req.body.pageNumber),
							body: req.body.body,
							lastUpdatedBy: parseInt(user.id),
							histories: {
								set: []
							}
						}
					})
					const updateHistory = await prisma.history.create({
						data: {
							userID: user.id,
							prevBody: req.body.tempBody,
							currBody: req.body.body,
							commit: req.body.commit,
							pageRef: parseInt(req.params.id),
							bookRef: book.id
						}
					})
					req.flash('success', 'Page updated Successfully')
					res.redirect(`/books/page/${req.params.id}`)

				} catch (e) {
					res.send(e)
				}
			} else {
				const currentPageBody = page.body.split('')
				const prevPageBody = req.body.tempBody.split('')

				let isDifferent = false;

				var limit = currentPageBody.length > prevPageBody.length ? currentPageBody.length : prevPageBody.length

				for (let i = 0; i < limit; i++) {
					if (currentPageBody[i] !== prevPageBody[i]) {
						isDifferent = true
					}
				}

				if (isDifferent) {
					const currVal = req.body.body
					// res.redirect(`/books/page/conflict/${req.params.id}`)
					res.render('modify_page_conflict', { user, page, currVal })

				} else {
					try {
						const updateHistory = await prisma.history.create({
							data: {
								userID: user.id,
								prevBody: req.body.tempBody,
								currBody: req.body.body,
								commit: req.body.commit,
								pageRef: parseInt(req.params.id),
								bookRef: book.id,
								book: {
									connect: {
										id: book.id
									}
								},
								page: {
									connect: {
										id: parseInt(req.params.id)
									}
								}
							}
						})
						req.flash('success', 'Page update request submitted successfully')
						res.redirect(`/books/page/${req.params.id}`)

					} catch (e) {
						res.send(e)
					}
				}
			}
		}
	})

// Modify page conflict
router.post('/page/conflict/:id', ensureAuthenticated,
	body('chapterName', 'Chapter name is required').notEmpty(),
	body('pageNumber', 'Page number is required').notEmpty(),
	body('pageNumber').custom((value, { req }) => {
		value = parseInt(req.body.pageNumber)
		if (value <= 0) {
			throw new Error('Page number should not be equal or less than 0')
		}
		return true;
	}),
	body('pageNumber').custom(async (value, { req }) => {
		const currentPage = await prisma.page.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		})
		value = await prisma.page.findMany({
			where: {
				bookID: currentPage.bookID
			}
		})
		value.forEach((page) => {
			if (currentPage.pageNumber !== parseInt(req.body.pageNumber)) {
				if (page.pageNumber === parseInt(req.body.pageNumber)) {
					throw new Error('Page number already exists')

				}
			}
			return true;
		})
	}),
	body('body', 'Content is required').notEmpty(),
	async (req, res) => {
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
		const user = req.user;
		let errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.render('modify_page_conflict.pug', {
				errors: errors.array(),
				page: page,
				user: user,
				book: book
			})
		}
		else {
			const currentPageBody = page.body.split('')
			const prevPageBody = req.body.tempBody.split('')
			const currVal = req.body.body

			let isDifferent = false;

			var limit = currentPageBody.length > prevPageBody.length ? currentPageBody.length : prevPageBody.length

			for (let i = 0; i < limit; i++) {
				if (currentPageBody[i] === prevPageBody[i]) {
					isDifferent = false
				}
				else {
					isDifferent = true
				}
			}

			if (isDifferent) {
				res.render('modify_page_conflict.pug', { user, page, currVal })

			}
			else {

				try {
					const updateHistory = await prisma.history.create({
						data: {
							userID: user.id,
							prevBody: req.body.tempBody,
							currBody: req.body.body,
							commit: req.body.commit,
							pageRef: parseInt(req.params.id),
							bookRef: book.id,
							book: {
								connect: {
									id: book.id
								}
							},
							page: {
								connect: {
									id: parseInt(req.params.id)
								}
							}
						}
					})
					req.flash('success', 'Page update request submitted successfully')
					res.redirect(`/books/page/${req.params.id}`)

				} catch (e) {
					res.send(e)
				}
			}
		}
	})

// Post request access
router.post('/request/:id', ensureAuthenticated,
	body('request', 'Please send the author a request message.').notEmpty(),
	async (req, res) => {
		const book = await prisma.book.findUnique({
			where: {
				id: parseInt(req.params.id)
			}
		})
		const user = req.user
		try {
			// Get Errors
			let errors = validationResult(req)

			if (!errors.isEmpty()) {
				res.render('books', {
					errors: errors.array(),
					user: user,
					book: book
				})
			} else {
				let newRequest = await prisma.request.create({
					data: {
						bookID: parseInt(req.params.id),
						userID: parseInt(req.user.id),
						message: req.body.request,
						bookOwner: {
							connect: {
								id: book.id
							}
						}
					}
				})
				req.flash('success', 'Request successfully sent to author');
				res.redirect(`/books/${book.id}`);
			}
		} catch (e) {
			res.send(e);
		}

	})

// Delete Book
router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
	const deletePages = await prisma.page.deleteMany({
		where: {
			bookID: parseInt(req.params.id)
		}
	})
	const deleteBook = await prisma.book.delete({
		where: {
			id: parseInt(req.params.id)
		}
	})
	// const transaction = await prisma.$transaction([deletePages, deleteBook])
	req.flash('success', 'Book successfully deleted')
	res.status(200).send("Successfully deleted")
})

// Delete Page
router.delete('/page/delete/:id', ensureAuthenticated, async (req, res) => {
	const deletePage = await prisma.page.delete({
		where: {
			id: parseInt(req.params.id)
		}
	})
	req.flash('success', 'Page successfully deleted')
	res.status(200).send("Successfully deleted")
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

// This code is for future reference 
const distinctGenre = async () => {
	await prisma.genre.findMany({
		distinct: ['genre'],
		select: {
			genre: true,
		},
	})
}

module.exports = router