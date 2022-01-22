const express = require('express');
const router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index',
        {

        }
    );
});

/* GET Users page. */
router.get('/users', function(req, res, next) {
    res.render('users',
        {
            
        }
    );
});

module.exports = router