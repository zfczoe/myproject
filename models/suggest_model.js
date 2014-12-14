var mongodb = require('../dbconfig'); 
exports.add = function(suggest, callback){
	mongodb.open(function(err,db){
		if(err){
			callback("open database err");
		}
		db.collection('suggests',function(err,collection){
			if(err){
				mongodb.close();
				callback("query database err");
			}
			var date = new Date();
			suggest.addTimeSeconds = date.getTime();
			suggest.addTime = date.getFullYear() + '年' + (date.getMonth() + 1 ) + '月' + date.getDate() + '日';
			collection.insert(suggest,{safe:true},function(err,doc){
				mongodb.close();
				callback(doc);
			});
		});
	});
}