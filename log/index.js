var colors 		= require('colors');
var moment 		= require('moment');

var log = {};
var DATE_FORMAT = 'DD/MM/YYYY - HH:mm:ss.SSS';


log.quiet = function(bool){
	if (bool){
		var quiet = function() { return; }

		log.info = quiet;
		log.success = quiet;
		log.funky = quiet;
	} else {
		log.info = log.info;
		log.success = log.success;
		log.funky = log.funky;
	}
}

// Initialises logging system

log.call = function(color, type) {
	if(color == undefined) color = 'white';
	var args = Array.prototype.slice.call(arguments.callee.caller.arguments);
	timestamp = Date.now();	
	log.formatAndOutput(args, color);
}

// Express middleware for custom log
log.express = function(req, res, next) {
	log.log(res.statusCode + " " + req.method + " " + req.baseUrl+req.url + " from " + req.ip);
	next();
}

log.formatAndOutput = function(args, color) {
	// Add colours and output to cmdline
	for (var i = 0; i < args.length; i++) {
		if(typeof args[i] === 'string'){
			args[i] = colors[color](args[i]);
		}
	};

	args.unshift(colors.grey("[" + moment(timestamp).format(DATE_FORMAT) + "] "));
	console.log.apply(console, args);	
}

log.log = function() {
	msgColor = 'white';
	log.call(msgColor, 'log');
}

log.debug = log.log;

log.bot = function() {
	log.call('white', 'bot');
}

log.success = function() {
	msgColor = 'green';
	log.call(msgColor, 'success');
}

log.info = function() {
	msgColor = 'blue';
	log.call(msgColor, 'info');
}

log.warn = function() {
	msgColor = 'yellow';
	log.call(msgColor, 'warn');
}

log.error = function() {
	msgColor = 'red';
	log.call(msgColor, 'error');
}

log.emerg = function() {
	msgColor = 'bgRed';
	log.call(msgColor, 'emergency');
}

log.funky = function() {
	msgColor = 'rainbow';
	log.call(msgColor, 'funky');
}

log.grey = function() {
	msgColor = 'grey';
	log.call(msgColor, 'grey');
}

module.exports = log;