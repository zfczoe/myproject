/*
	user model
*/
var mongodb = require('../dbconfig'); 
var User = require('../models/user');
exports.save = function(user,callback){
	mongodb.open(function(err,db){
		if(err){
			callback("open database err");
		}
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				callback("query database err");
			}
			user.addTime = new Date().getTime();
			collection.insert(user,{safe:true},function(err,user){//第二个user是插入的信息
				mongodb.close();

				// var newUser = getUser();
				callback(user);
			});
		});
	});

};

exports.getByNameAndPwd = function(username,password,callback){
	mongodb.open(function(err,db){
		db.collection('users', function(err, collection){
			collection.findOne({
				username: username,
				password: password
			},function(err,user){
				mongodb.close();
				if(!user){
					callback(null);	
				}else{
					callback(user);	
				}
			});
		});
	});
};
exports.checkUserName = function(username, callback){
	mongodb.open(function(err,db){
		db.collection('users', function(err, collection){
			collection.findOne({
				username: username
			},function(err,user){
				console.log('控制台：');
				console.log(user);
				mongodb.close();
				if(!user){
					callback(null);	
				}else{
					callback(user);	
				}
			});
		});
	});
}
exports.update = function(password, oUser, callback){
	mongodb.open(function(err,db){
		console.log(oUser);
		console.log(oUser.username);
		console.log(password);
		if(err){

		}else{
			db.collection('users', function(err, collection){
				collection.update({
				 username: oUser.username,
				 password: password
				},{$set: {password: oUser.password}},{safe:true}, function(err,result){
					mongodb.close();
					if(!result){
						callback(null);	
					}else{
						callback(result);	
					}
				});
			});

		}
	});
};

exports.updateUserHead = function(oUser, imgUrl,callback){
	mongodb.open(function(err,db){
		if(err){

		}else{
			db.collection('users', function(err, collection){
				collection.update({
				 username: oUser.username,
				 password: oUser.password
				},{$set: {headurl: imgUrl}},{safe:true}, function(err,result){
					mongodb.close();
					if(!result){	
						callback(null);	
					}else{
						callback(result);	
					}
				});
			});

		}
	});
}
exports.updateBasic = function(newUser, oUser, callback){
	mongodb.open(function(err,db){
		if(err){

		}else{
			db.collection('users', function(err, collection){
				collection.update({
					username: oUser.username,
					password: oUser.password
				},{
					$set: {
						realname: newUser.realname,
						gender: newUser.gender,
						email: newUser.email,
						personInfo: newUser.personInfo
					}
				}, {safe:true}, function(err,result){
					mongodb.close();
					if(!result){	
						callback(null);	
					}else{
						callback(result);	
					}
				});
			});
		}
	});
}
exports.getAuthorByUserName = function(username, callback){
	mongodb.open(function(err,db){
		db.collection('users', function(err, collection){
			collection.findOne({
				username: username
			},function(err,user){
				mongodb.close();
				if(!user){
					callback(null);	
				}else{
					callback(user);	
				}
			});
		});
	});
}








// var mongodb = require('./db');

// var model = {
// 	save: function(user, callback){
// 		mongodb.open(function(err, db){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			db.collection('users', function(err, collection) {
// 				if(err){
// 					mongodb.close();
// 					console.error(err);
// 					return;
// 				}
// 				collection.insert(user, {
// 					safe: true
// 				}, function(err, user) {
// 					if(err){
// 						console.error(err);
// 						user = null;
// 					}
// 					mongodb.close();
// 					model.getByName(user[0].name, function(data){
// 						callback(data);
// 					});
// 				});
// 			});
// 		});
// 	},
// 	getByName: function(name, callback){

// 		mongodb.open(function(err, db) {
// 			if (err) {
// 				console.error(err);
// 				return;
// 			}
// 			// 读取 users 集合
// 			db.collection('users', function(err, collection) {
// 				if (err) {
// 					mongodb.close();
// 					console.error(err);
// 					return;
// 				}
// 				// 查找 name 属性为 username 的文档
// 				collection.findOne({
// 					name: name
// 				}, function(err, data) {
// 					if(err){
// 						console.error(err);
// 					}
// 					mongodb.close();
// 					callback(data?data:null);
// 				});
// 			});
// 		});
// 	}
// };

// module.exports = model;








