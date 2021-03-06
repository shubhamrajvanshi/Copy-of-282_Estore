
/*
 * GET home page.
 */
var mysql = require('mysql');

var pool = mysql.createConnection({
	host : 'cmpe282.ccf8cucrxshq.us-east-1.rds.amazonaws.com',
	user : 'root',
	password : 'shubhamraj',
	port : 3306,
	database : 'shubhamawsdb'	
});
pool.connect();
var aws = require('aws-sdk');
aws.config.region = 'us-east-1';
aws.config.update({accessKeyId:'########################' , 
	               secretAccessKey:'#################################'});

var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});



exports.index = function(req, res){
  res.render('index');
};


exports.login = function(req, res){
 	res.render('login');
 	
};

exports.userlogin = function(req, res){
	var params = [req.param('userid'),req.param('pwd')];
	
	pool.query("select * from userinfo where userid = ? and password = ?;",
			params,function(err, rows,fields) {
		if(err || rows.length==0 ){
			console.log("user not found" + err);
		res.render('login');}
		else if(rows[0].isadmin==1)
		{
			console.log(rows[0].isadmin);
			res.render("admin",{username: params[0]})
		}
		
		else
		{	
		//console.log(rows);
			
	//	    console.log(pool.config);
			console.log(params[0]);
			res.render('index',{username: params[0]});  
		}
		
	});
	
 	
};

exports.register = function(req,res){
	res.render('register');
};

exports.authenticate = function(req,res){
	var params = [req.param('username'),req.param('password'),req.param('first_name'),req.param('last_name'),req.param('email')];
	pool.connect();
	pool.query("insert into userinfo(userid,password,fname,lname,emailid) values (?,?,?,?,?);",
			params,function(err, rows, fields) {
		if(err)
			console.log("user creation failed" + err);
		else
			console.log(rows);
	
	});
	
		var user= req.param('username');
	console.log(user);
	res.redirect('index',{username: user});
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

