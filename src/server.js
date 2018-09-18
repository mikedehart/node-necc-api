const express = require('express');

// Local requires
const api = require('./api/api');
const config = require('./conf/conf');
const logger = require('./util/logger');
const auth = require('./auth/authRoutes');

// App
const app = express();


// Connect to DB
require('mongoose').connect(config.db.url, config.db.options, function(err) {
	if(err) {
		logger.error(err);
	}
});

if(config.seed) {
	require('./util/seed')
}

// set up app middleware (and apply it to app)
require('./middleware/appMiddleware')(app);


// API and Auth routes
app.use('/api', api);
app.use('./auth', auth);


// Final error handling function
app.use(function(err, req, res, next) {
	if(err.name === 'UnauthorizedError') {
		// error most likely thrown from JWT validation check
		res.status(401).send('Invalid token sent!');
		return;
	}
	logger.error(err.stack);
	res.status(500).send(err);
});


module.exports = app;
