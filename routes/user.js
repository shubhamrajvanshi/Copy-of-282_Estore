var mysql = require('mysql');

var mysqlconnection = mysql.createConnection({
	host : 'cmpe282.ccf8cucrxshq.us-east-1.rds.amazonaws.com',
	user : 'root',
	password : 'shubhamraj',
	port : 3306,
	database : 'shubhamawsdb'	
});

var aws = require('aws-sdk');
aws.config.region = 'us-east-1';
aws.config.update({accessKeyId:'#######################' , 
	               secretAccessKey:'##############################'});

var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});

