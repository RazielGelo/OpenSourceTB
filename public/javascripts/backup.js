router.post('/page/modify/:id', ensureAuthenticated,
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
			if(currentPage.pageNumber !== parseInt(req.body.pageNumber)) {
				if (page.pageNumber === parseInt(req.body.pageNumber)) {
					throw new Error('Page number already exists')
	
				}
			}			
			return true;
		})
	}),
	body('tempbody', 'Content is required').notEmpty(),
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
			return res.render('modify_page.pug', {
				errors: errors.array(),
				page: page,
				user: user,
				book: book
			})
		}
		else {
			// This code can be refined
			try {
				const updatePage = await prisma.page.update({
					where: {
						id: parseInt(req.params.id)
					},
					data: {
						chapterName: req.body.chapterName,
						pageNumber: parseInt(req.body.pageNumber),
						body: req.body.body,
					}
				})
				req.flash('success', 'Page updated Successfully')
				res.redirect(`/books/page/${req.params.id}`)

			} catch (e) {
				res.send(e)
			}
		}
	})