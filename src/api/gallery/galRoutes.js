const router = require('express').Router();
const controller = require('./galController');
const auth = require('../../auth/auth');


// TODO: Add auth to update/delete/add galleries

// JWT auth for checking token before user can POST new galleries
const jwtAuth = [auth.decodeToken(), auth.verifyToken()];


// Everyone can view galleries
// Auth needed to create one

router.param('id', controller.params);

router.route('/')
	.get(controller.get) // get all galleries
	.post(jwtAuth, controller.post) // create a gallery

router.route('/:id')
	.get(controller.getOne) // get gallery by dirname
	.put(controller.put) // update gallery by dirname
	.delete(controller.delete) // delete gallery by dirname

module.exports = router;