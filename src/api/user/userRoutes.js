const router = require('express').Router();
const controller = require('./userController');
const auth = require('../../auth/auth');

// JWT auth for checking token before manipulation
const jwtAuth = [auth.decodeToken(), auth.verifyToken()];

router.param('id', controller.params);

router.route('/')
	.get(controller.get) // get all users
	.post(controller.post) // create a user

router.route('/lookup')
	.post(controller.lookup) // lookup ID based on email/key

router.route('/:id')
	.get(controller.getOne) // get user by id
	//.post(jwtAuth, controller.genkey) // Generate new key for a user
	.post(controller.genkey) // Generate new key for a user
	.put(controller.put) // update user by id
	.delete(controller.delete) // delete user by id

module.exports = router;
