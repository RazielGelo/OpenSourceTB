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

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login',
        {
            
        }
    );
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
    res.render('logout',
        {
            
        }
    );
});

/* GET textbook page. */
router.get('/textbook', function(req, res, next) {
    res.render('textbook',
        {
            
        }
    );
});



module.exports = router