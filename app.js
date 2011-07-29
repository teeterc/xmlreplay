/*
 * Initial entry point for xml replay
 * 
 */


var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , sio = require('socket.io');


/*
 * Configuration options;
 */
var PORT = 8000;


var app = express.createServer();


app.configure(
    function () {
	app.use(stylus.middleware({ src: __dirname + '/public', compile: compile }));
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	function compile (str, path) {
	    return stylus(str)
		.set('filename', path)
		.use(nib());
	};
    });



/*
 * URL Handlers
 * 
 */

var records = [{
		   'datetime': 'Oct 1 2010 4:13:22 (UTC)',
		   'url': 'http://www.boundip.com/installer/',
		   'ip': '123.122.223.11',
		   'id': 'k9jjk38lkjnvc,ml',
		   'duration': '1s'
	       },
	       {
		   'datetime': 'Oct 3 2011 4:13:22 (UTC)',
		   'url': 'http://www.boundip.com/',
		   'ip': '123.122.223.10',
		   'id': 'k9jjk38lkjnvclml',
		   'duration': '1s'
	       }
]

app.get('/', function (req, res) {
	    res.render('index', {layout: false, 'locals': {records: records}});
});


/*
 * App.listen
 */

app.listen(PORT, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});
