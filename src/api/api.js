const router = require('express').Router();
//const adminRoutes = require('./admin/adminRoutes');

/*
	API router for database endpoints.

	All endpoint databases should only be accessible via
	client application (running on localhost)
*/

// Mounting other routers for our routes
router.use('/admin', require('./admin/adminRoutes'));
router.use('/gallery', require('./gallery/galRoutes'));
router.use('/user', require('./user/userRoutes'));

module.exports = router;