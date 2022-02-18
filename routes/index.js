const express = require('express');
const router = express.Router();

// Render Index page
router.get('/', (req, res) => {
	res.render('index.pug')
})

router.get('/login', async (req, res) => {
	res.render('login.pug')
})

router.get('/register', async (req, res) => {
	res.render('register.pug');
})

module.exports = router