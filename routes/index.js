
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
aws.config.region = 'us-west-1';
aws.config.update({accessKeyId:'AKIAJYGXZCHYFVJIKF2Q' , 
	               secretAccessKey:'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'});

var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});



exports.index = function(req, res){
 
 get_all_products(function(data){
	 
	 var images = [];//new Array(data["Count"]);
	 var prices = [];
	 var products = [];
	 var categories = []
//	 get_all_categories(function (data1){
//		 for (var i=0; i< data["Count"]; i++)
//			 {
//			 categories[i] = data1["Items"].category;
//			 }
//		 
//		 for (var i=0; i < data["Count"];i++ )
//		 {
//		 images[i] = data["Items"][i].image.S ;
//		 prices[i] = data["Items"][i].price.S ;
//		 products[i] = data["Items"][i].product.S ;
//		 }
//		 console.log( "Categories are" + categories );
//	 });
	 for (var i=0; i < data["Count"];i++ )
	 {
	 images[i] = data["Items"][i].image.S ;
	 prices[i] = data["Items"][i].price.S ;
	 products[i] = data["Items"][i].product.S ;
	 }
	 	 
	 console.log(images);
	 //req.session.products=images
	res.render('index',{productsimage:images,products:products,productsprice:prices});
 });
  
  
  
  //res.render('index');
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
			req.session.user = params[0];
			var user = req.session.user;
			console.log(rows[0].isadmin);
			res.render("admin",{username: user });
		}
		
		else
		{	
		//console.log(rows);
			req.session.user = params[0];
	//	    console.log(pool.config);
			var user = req.session.user ;
			console.log(params[0]);
			get_all_products(function(data){
				 
				 var images = [];//new Array(data["Count"]);
				 var prices = [];
				 var products = [];
				 var categories = [];	 
				 for (var i=0; i < data["Count"];i++ )
				 {
				 images[i] = data["Items"][i].image.S ;
				 prices[i] = data["Items"][i].price.S ;
				 products[i] = data["Items"][i].product.S ;
				 }
		 
				 console.log(images);
				 //req.session.products=images
				res.render('index',{productsimage:images,products:products,productsprice:prices,username:user});
			 });
		//	res.render('index',{username: user});  
		}
		
	});
	
 	
};

exports.register = function(req,res){
	res.render('register');
};

exports.authenticate = function(req,res){
	var params = [req.param('username'),req.param('password'),req.param('first_name'),req.param('last_name'),req.param('email')];
//	pool.connect();
	pool.query("insert into userinfo(userid,password,fname,lname,emailid) values (?,?,?,?,?);",
			params,function(err, rows, fields) {
		if(err)
			console.log("user creation failed" + err);
		else
		{console.log(rows);
		req.session.user = params[0];
		var user = req.session.user;
		console.log(user);
		get_all_products(function(data){
			 
			 var images = [];//new Array(data["Count"]);
			 var prices = [];
			 var products = [];
			 var categories = [];	 
			 for (var i=0; i < data["Count"];i++ )
			 {
			 images[i] = data["Items"][i].image.S ;
			 prices[i] = data["Items"][i].price.S ;
			 products[i] = data["Items"][i].product.S ;
			 }
	 
			 console.log(images);
			 //req.session.products=images
			res.render('index',{productsimage:images,products:products,productsprice:prices,username:user});
		 });
		} // close of else
	});
	
		
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

exports.logout = function(req,res){
	req.session.user = null ;
	get_all_products(function(data){
		 
		 var images = [];//new Array(data["Count"]);
		 var prices = [];
		 var products = [];
		 var categories = []

		 for (var i=0; i < data["Count"];i++ )
		 {
		 images[i] = data["Items"][i].image.S ;
		 prices[i] = data["Items"][i].price.S ;
		 products[i] = data["Items"][i].product.S ;
		 }
		 
		 
		 
		 console.log(images);
		 //req.session.products=images
		res.render('index',{productsimage:images,products:products,productsprice:prices});
	 });
};


function get_all_products(callback) {
	
	var params = {
			
		    "TableName" : 'catalog',
		    "Limit"     : 10,
		    "Select": 'ALL_ATTRIBUTES',
		    "ScanFilter": {
		        "category": {
		          ComparisonOperator: 'NOT_NULL'}},
		  }
	
	
	dynamodb.scan(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            callback(err);
        } else {
        	//console.log(data);
        	callback(data);
	
        }
	});
	
};

function get_all_categories(callback) {
	
	var params = {
			"TableName" : 'category',
		    "Limit"     : 10,
		    "Select": 'ALL_ATTRIBUTES',
		      }
		
	dynamodb.scan(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            callback(err);
        } else {
        //	console.log(data);
        	callback(data);
	
        }
	});
	
}



