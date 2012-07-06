var express = require('express'),
    jade = require('jade');

var appserver = express.createServer(express.logger());

appserver.configure(function() {
    	appserver.set('views', __dirname + '/jades');
    	appserver.set('view options', {layout: false});
    	
    	appserver.use('/libs', express.static(__dirname + '../../libs'));
    	appserver.use('/app', express.static(__dirname + '../../app'));
    });

// routes?
appserver.get('/', function(request, response){
	//response.send('hello there...');
	response.render('index.jade');
});

appserver.get('/woww', function(request, response){
	response.render('app.jade');
});

var port = process.env.POSRT || 5000;
appserver.listen(port, function(){
	console.log("Listening on port: " + port);
});