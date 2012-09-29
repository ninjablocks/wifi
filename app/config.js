var 
	middleware = require('./middleware')
	, express = require('express')
	, route = require('./routes')
	, events = require('events')
	, util = require('util')
	, path = require('path')
;

module.exports = function(app) {
	
	var mids = middleware(app);	
	
	events.EventEmitter.call(app);
	util.inherits(events.EventEmitter, app);

	app.set('views', path.resolve(__dirname, '..', 'views'));
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	
	/**
	 * We can log everything here
	 */	
	app.all('*', function(req, res, next) {

		console.log(req.route);
		next();
	});

	return route(app, mids);	
};