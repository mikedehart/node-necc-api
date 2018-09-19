const router = require('express').Router();
const controller = require('./authController');
const auth = require('./auth');

// Authorization middleware 
const verifyUser = auth.verifyUser;
const checkToken = [auth.decodeToken(), auth.verifyToken()];


// When login form posts, call verifyUser to make sure user info matches.
// Passed username / password
router.post('/signin', verifyUser(), controller.signin);

// When a token exists, just need to verify it matches a user.
router.post('/checktoken', checkToken, controller.checktoken);

module.exports = router;