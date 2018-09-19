const bp = require('body-parser');
const cors = require('cors');
const override = require('method-override');
const morgan = require('morgan');

module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bp.urlencoded({ extended: true }));
	app.use(bp.json());
	app.use(cors());
	app.use(override());
};