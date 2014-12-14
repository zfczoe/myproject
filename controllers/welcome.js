/*
	welcome controller
*/
var blogModel = require('../models/blog_model');
var userModel = require('../models/user_model');
var commentModel = require('../models/comment_model');
var Blog = require('../models/blog');
var string = require('../public/javascripts/userDefined/string');
var fs = require('fs');
exports.index = function(req, res) {
	res.render('index', {
		title: 'Express',
		success: req.flash('success').toString(),
		loginUser: req.session.loginUser
	});
}
exports.login = function(req, res) {
	res.render('login', {
		title: '登陆',
		noReg: req.flash('noReg').toString()
	});
}

exports.reg = function(req, res) {
	res.render('reg', {
		title: '注册',
		error: req.flash('error').toString()
	});
}
exports.aboutLink = function(req, res){
	res.render('link', {
		title: '相关链接',
		loginUser: req.session.loginUser,
		user: req.session.loginUser
	});
}
exports.toHarbin = function(req, res){
	res.render('harbin', {
		title: '美丽的哈尔滨',
		loginUser: req.session.loginUser,
	});
}
exports.toWebqq = function(req, res){
	res.render('webqq', {
		title: 'WebQQ',
		loginUser: req.session.loginUser,
	});
}
exports.userExit = function(req, res) {
	delete req.session.loginUser;
	res.render('login', {
		title: '登陆',
		noReg: req.flash('noReg').toString()
	});
}
exports.toblog = function(req, res){
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var oUser = req.session.loginUser;
	blogModel.getBlogsByUser(oUser, page, function(err, posts, total){
		if (err) {
	      posts = [];
	    }else{
	    	// for (var i = 0; i < posts.length; i++) {
	    		// fs.readFile(posts[i].content, 'utf-8', function(err, data){
	    		// 	posts[i-1].content = data;
	    		// });
	   //  		(function(num){ 
	   //  			fs.readFile(posts[num].content, 'utf-8', function(err, data){
		  //   			// console.log(data);
		  //   			posts[num].content = data;
		  //   			console.log(posts[num].content + '1111');
		  //   		});
				// })(i);
				// try{
				// 	var data = fs.readFileSync(posts[i].content, 'utf-8');
				// 	posts[i].content = string.subStringch(data,300);
				// }catch(ex){
				// 	console.log('读文件时发生错误');
				// }
	   //  	};
	    	
	    }
 //    Object.prototype.clone = function() {
	//     var o = (this.constructor === Array ? [] : {});
	// 	for(var e in this) {
	// 		o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
	// 	}
	// 	return o;
	// }
	    // var sorts = [];
	     blogModel.getNew(oUser, function(err, postsNew){
		    blogModel.readBlogSort(oUser, function(err, blogSort){
				 res.render('blog', {
					title: '我的博客',
					flag: '1',
					loginUser: req.session.loginUser,
					user: oUser,
					page: page,
				    isFirstPage: (page - 1) == 0,
				    isLastPage: ((page - 1) * 10 + posts.length) == total,
					posts: posts,
					postsNew: postsNew,
					postsLen: posts.length,
					isMyBlog: true,
					sorts: blogSort,
					flagfenlei: 0
				});
			});
	    });
	});
}
exports.personCenterBasic = function(req, res){
	res.render('personCenterBasic', {
		title: '基本信息',
		error: req.flash('error').toString(),
		loginUser: req.session.loginUser
	});
}
exports.personCenterResetPwd = function(req, res){
	res.render('personCenterResetPwd', {
		title: '修改密码',
		error: req.flash('error').toString(),
		success: req.flash('success').toString(),
		loginUser: req.session.loginUser
	});
}

exports.writeBlog = function(req, res){
	var loginUser = req.session.loginUser;
	blogModel.readBlogSort(loginUser, function(err, posts){
		res.render('writeBlog', {
		title: '写博客',
		loginUser: req.session.loginUser,
		posts: posts
	});
	});
}
// enjoy
exports.enjoy = function(req, res){
	res.render('enjoy', {
		title: 'node',
		loginUser: req.session.loginUser,
		noReg: null
	});
}
exports.effect = function(req, res){
	var flag = req.query.flag;
	res.render('enjoy/'+flag, {
		title: 'node',
		loginUser: req.session.loginUser,
		file: flag
	});
}
exports.resetHead = function(req, res){
	res.render('resetHead', {
		title: '修改头像',
		loginUser: req.session.loginUser,
		success: req.flash('success').toString()
	});
}
exports.enjoyBlog = function(req, res){
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var oUser = req.session.loginUser ? req.session.loginUser:{username:'zhangfang', headurl:'uploads/photo/3564-3ft5r0.jpg'};
	blogModel.getTen(null, page, function(err, posts, total){
		if (err) {
	      posts = [];
	    }else{
	   //  	for (var i = 0; i < posts.length; i++) {
				// try{
				// 	var data = fs.readFileSync(posts[i].content, 'utf-8');
				// 	posts[i].content = string.subStringch(data,300);
				// }catch(ex){
				// 	console.log('读文件时发生错误');
				// }
	   //  	};
	    }
	    blogModel.getNew(oUser, function(err, postsNew){
		    blogModel.readBlogSort(oUser, function(err, blogSort){
				 res.render('blog', {
					title: '浏览博客',
					flag: null,
					loginUser: req.session.loginUser,
					user: oUser,
					page: page,
				    isFirstPage: (page - 1) == 0,
				    isLastPage: ((page - 1) * 10 + posts.length) == total,
					posts: posts,
					postsNew: postsNew,
					postsLen: posts.length,
					isMyBlog: false,
					sorts: blogSort,
					flagfenlei: 0
				});
			});
	    });
	});
}
exports.readMore = function(req, res){
	var blogId = req.query.blogId;   //blogId is blogName
	var oUser = req.session.loginUser ? req.session.loginUser:{username:'zhangfang', headurl:'uploads/photo/24484-fomuu6.jpg'};
	blogModel.getBlogByBlogId(blogId, function(err, post){
		if (err) {
	      	post = null;
	    }else{
	    }
	    commentModel.getCommentByBlogId(blogId, function(err,comments){  //blogId is blogname
		     blogModel.getNew(oUser, function(err, postsNew){   
			    blogModel.readBlogSort(oUser, function(err, blogSort){  //读取文章信息sort
					 res.render('readMore', {
					title: '全文',
					user: oUser,
					loginUser: req.session.loginUser,
					post: post,
					flag: null,
					sorts: blogSort,
					postsNew: postsNew,
					comments: comments
				});
				});
		    });
	    });
	});
}
exports.removeBlog = function(req, res){
	var blogId = req.query.blogId;
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var oUser = req.session.loginUser;
	blogModel.getBlogsByUser(oUser, page, function(err, posts, total){
		if (err) {
	      posts = [];
	    }else{
	   //  	for (var i = 0; i < posts.length; i++) {
				// try{
				// 	var data = fs.readFileSync(posts[i].content, 'utf-8');
				// 	posts[i].content = string.subStringch(data,300);
				// }catch(ex){
				// 	console.log('读文件时发生错误');
				// }
	   //  	};
	    	
	    }
	     blogModel.getNew(oUser, function(err, postsNew){
		    blogModel.readBlogSort(oUser, function(err, blogSort){
		    	blogModel.removeBlogByBlogId(blogId, function(err,blogs){
					res.render('blog', {
						title: '我的博客',
						flag: '1',
						loginUser: req.session.loginUser,
						user: oUser,
						page: page,
					    isFirstPage: (page - 1) == 0,
					    isLastPage: ((page - 1) * 10 + posts.length) == total,
						posts: posts,
						postsNew: postsNew,
						postsLen: posts.length,
						isMyBlog: true,
						success: req.flash('success').toString(),
						sorts: blogSort,
						flagfenlei: 0
					});
				});
			});
	    });
	});
}
exports.addBlogSort = function(req, res){
	var loginUser = req.session.loginUser;
	blogModel.readBlogSort(loginUser, function(err, posts){
		res.render('personCenterAddBlogSort', {
			title: '添加分类',
			success: req.flash('success').toString(),
			loginUser: req.session.loginUser,
			posts: posts
		});
	});
}
exports.toAuthor = function(req, res){
	var author = req.query.author;
	var page = req.query.p ? parseInt(req.query.p) : 1;
	userModel.getAuthorByUserName(author, function(user){
		var oUser = user;
		console.log(oUser);
		blogModel.getBlogsByUser(oUser, page, function(err, posts, total){
		if (err) {
	      posts = [];
	    }else{
	   //  	for (var i = 0; i < posts.length; i++) {
				// try{
				// 	var data = fs.readFileSync(posts[i].content, 'utf-8');
				// 	posts[i].content = string.subStringch(data,300);
				// }catch(ex){
				// 	console.log('读文件时发生错误');
				// }
	   //  	};
	    	
	    }
	     blogModel.getNew(oUser, function(err, postsNew){
		    blogModel.readBlogSort(oUser, function(err, blogSort){
				 res.render('blog', {
					title: '我的博客',
					flag: '1',
					loginUser: req.session.loginUser,
					user: oUser,
					page: page,
				    isFirstPage: (page - 1) == 0,
				    isLastPage: ((page - 1) * 10 + posts.length) == total,
					posts: posts,
					postsNew: postsNew,
					postsLen: posts.length,
					isMyBlog: false,
					sorts: blogSort,
					flagfenlei: 0
				});
			});
	    });
	});
});
}
exports.oneSort = function(req, res){
	var blogSort = req.query.blogSort;
	var author = req.query.user;   //author是username
	console.log(author);
	var page = req.query.p ? parseInt(req.query.p) : 1;
	userModel.getAuthorByUserName(author, function(user){
		var oUser = user;
		console.log(oUser);
		blogModel.getBlogsByUserAndSort(oUser, blogSort, page, function(err, posts, total){
		if (err) {
	      posts = [];
	    }else{
	   //  	for (var i = 0; i < posts.length; i++) {
				// try{
				// 	var data = fs.readFileSync(posts[i].content, 'utf-8');
				// 	posts[i].content = string.subStringch(data,300);
				// }catch(ex){
				// 	console.log('读文件时发生错误');
				// }
	   //  	};
	    	
	    }
	     blogModel.getNew(oUser, function(err, postsNew){
		    blogModel.readBlogSort(oUser, function(err, blogSort){
				 res.render('blog', {
					title: '我的博客',
					flag: '1',
					loginUser: req.session.loginUser,
					user: oUser,
					page: page,
				    isFirstPage: (page - 1) == 0,
				    isLastPage: ((page - 1) * 10 + posts.length) == total,
					posts: posts,
					postsNew: postsNew,
					postsLen: posts.length,
					isMyBlog: false,
					sorts: blogSort,
					flagfenlei: 1,   //标识信息请求来自分类
					blogSort: blogSort,
					username: author
				});
			});
	    });
	});
});
}