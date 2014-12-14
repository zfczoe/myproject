var express = require('express');
var router = express.Router();
var welcome = require('./controllers/welcome')
var user = require('./controllers/user')
var blog = require('./controllers/blog');
var comment = require('./controllers/comment');
var chatRoom = require('./controllers/chatRoom')
var suggest = require('./controllers/suggest')
/* GET home page. */
router.get('/', welcome.index);
router.get('/login', welcome.login);
router.get('/reg', welcome.reg);
router.get('/toblog', welcome.toblog);
router.get('/personCenterBasic', welcome.personCenterBasic);
router.get('/personCenterResetPwd', welcome.personCenterResetPwd);
router.get('/writeBlog', welcome.writeBlog);
router.get('/addBlogSort', welcome.addBlogSort);
router.get('/enjoy', welcome.enjoy);    //欣赏
router.get('/resetHead', welcome.resetHead);
router.get('/enjoyBlog', welcome.enjoyBlog);
router.get('/readMore', welcome.readMore);
router.get('/effect', welcome.effect);
router.get('/removeBlog', welcome.removeBlog);
router.get('/link', welcome.aboutLink);
router.get('/toAuthor', welcome.toAuthor);
router.get('/oneSort', welcome.oneSort);
router.get('/toHarbin', welcome.toHarbin);
router.get('/chatRoom', chatRoom.index);
router.get('/toWebqq', welcome.toWebqq);
router.get('/userExit', welcome.userExit);
router.post('/login', user.login);
router.post('/reg', user.reg);
router.post('/checkUser', user.checkUser);
router.post('/addblog', blog.addblog);
router.post('/addBlogSort', blog.addBlogSort);
router.post('/resetPassword', user.resetPassword);
router.post('/uploadHead', user.uploadHead);
router.post('/setBasic', user.setBasic);
router.post('/set', user.set);
router.post('/addComment', comment.addComment);
router.post('/addSuggest', suggest.addSuggest);
module.exports = router;
