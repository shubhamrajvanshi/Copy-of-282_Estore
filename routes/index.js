
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Shubham' });
};


exports.login = function(req, res){

	
	res.render('login');
};

exports.register = function(req,res){
	res.render('register');
};

exports.authenticate = function(req,res){
	var user= req.param('username');
	console.log(user);
	res.render('index',{username: user});
};

exports.contact = function(req,res){
	res.render('contact');
};

exports.details = function(req,res){
	res.render('details');
};

exports.products = function(req,res){
	res.render('products');
};

