var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env'))
{
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var rides = require('./routes/rides');
app.get('/rides', rides.rides);

var add_ride = require('./routes/add_ride');
app.get('/add_ride', add_ride.add_ride);

var register = require('./routes/register');
app.get('/register', register.register);

var contact = require('./routes/contact');
app.get('/contact', contact.contact);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
