const express = require('express');
const router = express.Router();


// Render Index page
router.get('/', (req, res) => {
	res.render('index.pug')
})

module.exports = router