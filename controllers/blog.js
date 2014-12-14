/*
	blog controller
*/
var blogModel = require('../models/blog_model');
var Blog = require('../models/blog');
var BlogSort = require('../models/blogSort');
var fs = require('fs');
exports.addblog = function(req, res) {
	//1、接收数据
	var title = req.body.title;
	var content = req.body.content;
	var blogSort = req.body.blogSort;
	var author = req.session.loginUser;
	// var blogUrl = 'public/uploads/blogs/' + new Date().getTime() + '.txt';
	 // var blogUrl = content;
	// fs.writeFile(blogUrl, content, function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		console.log('操作成功');
	// 	}
	// });
	var blog = new Blog(title, content, author,blogSort);
	//2、调用modelz
	blogModel.save(blog,function(blog){
	//3、跳转
		if(blog){
			req.flash('success', '发表成功！');
			res.redirect('/');
		}
	});
	// res.send('success');
}
exports.addBlogSort = function(req, res){
	var addSort = req.body.addBlogSort;
	var loginUser = req.session.loginUser;
	var blogSort = new BlogSort(addSort, loginUser);   //new +  大写
	blogModel.addBlogSort(blogSort, function(err, blogs){
		console.log(blogs);
		req.flash('success', '添加成功！');
		res.redirect('/addBlogSort');
	});
}

