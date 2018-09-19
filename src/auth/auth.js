const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../conf/conf');
const checkToken = expressJwt({ secret: config.jwt.secret });
const Admin = require('../api/admin/adminModel');



// Decode incoming token. Returns a middleware function
exports.decodeToken = function() {
	return function(req, res, next) {
		// Check for token in query string
		if(req.query && req.query.hasOwnProperty('access_token')) {
			req.headers.authorization = 'Bearer ' + req.query.access_token;
		}

		// Check for access_token property (from cookie)
		// assigned in post call from api.verify
		let neccCookie = req.body.access_token;
		if(neccCookie) {
			req.headers.authorization = 'Bearer ' + neccCookie;
		}

		// Will call next if token is valid, and send error if it is not.
		// Decoded token attached to req.user
		checkToken(req, res, next);
	};
};

// Make sure incoming decoded token points to a real user in the database
// Called AFTER decodeToken()
exports.verifyToken = function() {
	return function(req, res, next) {
		if(!req.user) {
			next(new Error('No user information'));
		} else {
			let userId = req.user._id;
			Admin.findById(userId)
				.then((user) => {
					if(!user) {
						//next(new Error('No valid user for this token'));
						res.status(401).send('No valid user for this token');
					} else {
						req.user = user;
						next();
					}
				}, (err) => {
					next(err);
				});

		}
	};
};

// using username / password to verify user
exports.verifyUser = function() {
	return function(req, res, next) {
		const username = req.body.username;
		const password = req.body.password;

		// If no username / password then stop
		if(!username || !password) {
			res.status(401).send('No username / password sent!');
			return;
		}

		Admin.findOne({ username: username })
			.then((user) => {
				if(!user) {
					res.status(401).send('No user with given username');
				} else {
					if(!user.authenticate(password)) {
						consol.log('WRONG PASS');
						res.status(401).send("Incorrect password");
					} else {
						// Checks out, assign the user to req.user
						req.user = user;
						next();
					}
				}
			},
			(err) => {
				next(err);
			});
	};
};


// Sign token after successful login
exports.signToken = function(id) {
	return jwt.sign(
		{ _id: id },
		config.jwt.secret,
		{ expiresIn: config.jwt.expireTime }
	);
};