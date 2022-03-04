const express = require('express');
const router = express.Router();
// Import PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Render Index page
router.get('/', async (req, res) => {
	const books = await prisma.book.findMany({})
	const totalbooksCount = await prisma.book.count()
	res.render('index.pug', { books, totalbooksCount })
})

router.get('/login', async (req, res) => {
	res.render('login.pug')
})

router.get('/register', async (req, res) => {
	res.render('register.pug');
})

router.get('/books', async (req, res) => {
	res.render('books.pug');
})

module.exports = router