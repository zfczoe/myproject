/*
	comments controller
*/
var commentModel = require('../models/comment_model');
var Comment = require('../models/comment');
exports.addComment = function(req, res){
	var loginUser = req.session.loginUser;
	var commentName = req.body.commentName;
	var content = req.body.comment;
	var oBlog = req.body.oBlog;   //blog title
	var comment = new Comment();
	if(loginUser){
		comment.commentPerson = loginUser;
	}else{
		comment.commentPersonN = commentName;
	}

	comment.content = content;    //评论内容


	comment.blog = oBlog;   //blog'title

	commentModel.addComment(comment,function(err,doc){
		if(doc){
			
			res.redirect('/');
		}else{
			res.redirect('/login');
		}
	});
}