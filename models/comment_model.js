/*
	comment model
*/
var mongodb = require('../dbconfig'); 
exports.addComment = function(comment,callback){
	mongodb.open(function(err,db){
		if(err){
			callback("open database err");
		}
		db.collection('comments',function(err,collection){
			if(err){
				mongodb.close();
				callback("query database err");
			}
			var date = new Date();
			comment.addTimeSeconds = date.getTime();
			comment.addTime = date.getFullYear() + '年' + (date.getMonth() + 1 ) + '月' + date.getDate() + '日';
			collection.insert(comment,{safe:true},function(err,doc){//第二个user是插入的信息
				mongodb.close();
				// var newUser = getUser();
				callback(err,doc);
			});
		});
	});
};
exports.getCommentByBlogId = function(blogId, callback){
	mongodb.open(function(err,db){
	db.collection('comments', function(err, collection){
		collection.find({
			blog: blogId
		}).toArray(function(err,comment){
			mongodb.close();
			if(!comment){
				callback(err, null);
			}else{
				callback(err, comment);
			}
		});
	});
});
}