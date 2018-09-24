const Admin = require('../api/admin/adminModel');
const Gallery = require('../api/gallery/galModel');
const User = require('../api/user/userModel');


/* 
	Database seed script
	- Seeds test data in database for development
----------------------- */

const _ = require('lodash');
const logger = require('./logger');

logger.log('Seeding the Database with test values');

// Data arrays
let users = [
	{
		purchase_id: 'PAY1234567',
		fname: 'Michael',
		lname: 'Fowler',
		email: 'mike@fowler.com',
		subscribed: false,
		signdate: new Date(),
		sitekey: '12345'
	},
	{
		purchase_id: 'PAY890',
		fname: 'Jimmy',
		lname: 'Chan',
		email: 'jim@chan.org.com',
		subscribed: false,
		signdate: new Date(),
		sitekey: 'hello'
	},
	{
		purchase_id: 'PAY1902',
		fname: 'Test',
		lname: 'User',
		email: 'email@email.com',
		subscribed: false,
		signdate: new Date(),
		sitekey: 'test'
	}
];

let galleries = [
	{
		title: 'My Gallery',
		path: '/img/events/mygallery',
		dirname: 'mygallery',
		evtdate: 'Sept 2018',
		text: 'This is a test gallery. There are many like it but this one is mine'
	},
	{
		title: 'Clemson Gallery',
		path: '/img/events/clemsongallery',
		dirname: 'clemsongallery',
		evtdate: 'Nov 2019',
		text: 'Lorem ipsum dolor set amit blah blah blah'
	}
];

let admins = [
	{
		username: 'mike',
		password: 'hello'
	},
	{
		username: 'admin',
		password: 'admin'
	}
];

let createDoc = function(model, doc) {
	return new Promise(function(resolve, reject) {
		new model(doc).save(function(err,saved) {
			return err ? reject(err) : resolve(saved);
		});
	});
};

let cleanDB = function() {
	logger.log('cleaning up database...');
	let cleanPromises = [Admin, Gallery, User].map(function(model) {
		return model.remove().exec();
	})
	return Promise.all(cleanPromises);
};

let createUsers = function(data) {
	let promises = users.map(function(user) {
		return createDoc(User, user);
	});

	return Promise.all(promises)
		.then(function(users){
			return _.merge({ users: users }, data || {});
		})
};

let createGalleries = function(data) {
	let promises = galleries.map(function(gallery) {
		return createDoc(Gallery, gallery);
	});

	return Promise.all(promises)
		.then(function(galleries){
			return _.merge({ galleries: galleries }, data || {});
		})
};

let createAdmins = function(data) {
	let promises = admins.map(function(admin) {
		return createDoc(Admin, admin);
	});

	return Promise.all(promises)
		.then(function(admins){
			return _.merge({ admins: admins }, data || {});
		})
};

cleanDB()
	.then(createAdmins)
	.then(createGalleries)
	.then(createUsers)
	.then(logger.log.bind(logger))
	.catch(logger.log.bind(logger));