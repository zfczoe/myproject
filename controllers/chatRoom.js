exports.index = function(req, res) {
	res.render('chatRoom/chatIndex', {
		title: '聊天室',
		// success: req.flash('success').toString(),
		// user: req.session.loginUser
	});
}