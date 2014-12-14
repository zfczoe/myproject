/*
	blog model
*/
var mongodb = require('../dbconfig'); 
var Blog = require('../models/blog');
var markdown = require('markdown').markdown;
exports.save = function(blog,callback){
	mongodb.open(function(err,db){
		if(err){
			callback("open database err");
		}
		db.collection('blogs',function(err,collection){
			if(err){
				mongodb.close();
				callback("query database err");
			}
			var date = new Date();
			blog.addTimeSeconds = date.getTime();
			blog.addTime = date.getFullYear() + '年' + (date.getMonth() + 1 ) + '月' + date.getDate() + '日';
			collection.insert(blog,{safe:true},function(err,doc){//第二个user是插入的信息
				mongodb.close();
				// var newUser = getUser();
				callback(doc);
			});
		});
	});
};
exports.getBlogsByUser = function(oUser, page, callback){
	mongodb.open(function(err,db){
		if (err) {
	      return callback(err);
	    }
		db.collection('blogs', function(err, collection){
			if (err) {
		        mongodb.close();
		        return callback(err);
		    }
		    var query = {};
		    // if (name) {
		    //     query.name = name;
		    // }  //未用
			
	collection.count(query, function (err, total) {
        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
        collection.find({
				// 'author._id': oUser._id
				'author.username': oUser.username
			}, {
	          skip: (page - 1)*10,
	          limit: 10
	        }).sort({
	          addTimeSeconds: -1
	        }).toArray(function (err, docs) {
	          mongodb.close();
	          if (err) {
	            return callback(err);
	          }
	          //解析 markdown 为 html
	          // docs.forEach(function (doc) {
	          //   doc.post = markdown.toHTML(doc.post);
	          // }); 
	          callback(null, docs, total);
	        });
	      });
		});
	});
}
exports.getBlogByBlogId = function(blogId, callback){
	mongodb.open(function(err,db){
		db.collection('blogs', function(err, collection){
			collection.findOne({
				title: blogId
				// _id:   Objectid(blogId)
				// "_id": ObjectId(blogId)
			}, function(err,blog){
				blog.readCount +=1;
				collection.update({
				 title: blog.title
				},{$set: {readCount: blog.readCount}},{safe:true}, function(err,result){
				
				});
				mongodb.close();
				if(!blog){
					callback(err,null);	
				}else{
					callback(err,blog);	
				}
			});
		});
	});
}

//一次获取十篇文章
exports.getTen = function(name, page, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 blogs 集合
    db.collection('blogs', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      //使用 count 返回特定查询的文档数 total
      collection.count(query, function (err, total) {
        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
        collection.find(query, {
          skip: (page - 1)*10,
          limit: 10
        }).sort({
          addTimeSeconds: -1
        }).toArray(function (err, docs) {
          mongodb.close();
          if (err) {
            return callback(err);
          }
          //解析 markdown 为 html
          // docs.forEach(function (doc) {
          //   doc.post = markdown.toHTML(doc.post);
          // });
          callback(null, docs, total);
        });
      });
    });
  });
};
exports.getNew = function(oUser, callback) {   //最新文章
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 blogs 集合
    db.collection('blogs', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
   
      //使用 count 返回特定查询的文档数 total
      collection.count(query, function (err, total) {
        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
        collection.find({
			'author.username': oUser.username
		},{
          skip: 0,
          limit: 10
        }).sort({
          addTimeSeconds: -1
        }).toArray(function (err, docs) {
          mongodb.close();
          if (err) {
            return callback(err);
          }
          //解析 markdown 为 html
          // docs.forEach(function (doc) {
          //   doc.post = markdown.toHTML(doc.post);
          // });
          callback(null, docs);
        });
      });
    });
  });
};


exports.removeBlogByBlogId = function(blogId, callback){
	mongodb.open(function(err,db){
		db.collection('blogs', function(err, collection){
			collection.remove({
				title: blogId
				// _id:   Objectid(blogId)
				// "_id": ObjectId(blogId)
			}, function(err,blog){
				mongodb.close();
				// console.log(blog + err);
				if(!blog){
					callback(err,null);	
				}else{
					callback(err,blog);
					console.log(blog);
				}
			});
		});
	});
};
exports.readBlogSort = function(user, callback){
	mongodb.open(function(err,db){
		db.collection('blogSort', function(err, collection){
			collection.find({
				// 'user._id': user._id
				'user.username': user.username
			}).toArray(function(err,blogs){
				mongodb.close();
				if(!blogs){
					callback(err, null);
				}else{
					callback(err, blogs);
				}
			});
			
		});
	});
}
exports.addBlogSort = function(blogSort, callback){
	mongodb.open(function(err,db){
		db.collection('blogSort', function(err, collection){
			collection.insert( blogSort,{safe:true},function(err,doc){//第二个user是插入的信息
				mongodb.close();
				// var newUser = getUser();
				callback(doc);
			});
		});
	});
}

// 根据用户和文章类别查询文章，blog_right.ejs 右侧
exports.getBlogsByUserAndSort = function(oUser, blogSort, page, callback){
	mongodb.open(function(err,db){
		if (err) {
	      return callback(err);
	    }
		db.collection('blogs', function(err, collection){
			if (err) {
		        mongodb.close();
		        return callback(err);
		    }
		    var query = {};
		    // if (name) {
		    //     query.name = name;
		    // }  //未用
			
	collection.count(query, function (err, total) {
        //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
        collection.find({
				// 'author._id': oUser._id
				'author.username': oUser.username,
				'blogSort': blogSort
			}, {
	          skip: (page - 1)*10,
	          limit: 10
	        }).sort({
	          addTimeSeconds: -1
	        }).toArray(function (err, docs) {
	          mongodb.close();
	          if (err) {
	            return callback(err);
	          }
	          //解析 markdown 为 html
	          // docs.forEach(function (doc) {
	          //   doc.post = markdown.toHTML(doc.post);
	          // }); 
	          callback(null, docs, total);
	        });
	      });
		});
	});
}