// Import base framework for route handling
const express = require('express');
const router = express.Router();
// Imports PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Render Index page
router.get('/', async (req, res) => {
	const books = await prisma.book.findMany({});
	const totalbooksCount = await prisma.book.count();
	res.render('index.pug', { books, totalbooksCount });
});
// Render Login page
router.get('/login', async (req, res) => {
	res.render('login.pug');
});
// Render Register page
router.get('/register', async (req, res) => {
	res.render('register.pug');
});
// Render Books page
router.get('/books', async (req, res) => {
	res.render('books.pug');
});

// Render About Us page
router.get('/about', async (req, res) => {
	res.render('about_us.pug');
});

module.exports = router;