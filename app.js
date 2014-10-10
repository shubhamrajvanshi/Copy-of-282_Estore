
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  //,  user = require('./routes/user')
  , http = require('http')
  , path = require('path');
	
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/user', function(req,res){
//	
//	var msg = ["<H1> Hi Shubham!!</H1>",
//	"<b> Time to rock expres nodejs </b>"
//		];
//	res.send("hello you have reached users page from app");
//	res.send(msg);
//});
app.get('/Login',routes.login);
app.get('/index',routes.index);
app.get('/register',routes.register);
app.get('/products',routes.products);
app.get('/details',routes.details);
app.get('/contact',routes.contact);	
app.post('/signup',routes.authenticate);
app.post('/userlogin',routes.userlogin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});