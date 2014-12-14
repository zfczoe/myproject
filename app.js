var express = require('express');
var path = require('path');//加载path模块，path模块用来设置和系统路径有关的信息
var settings = require('./settings');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');//加载(routes)/index.js
var http = require('http');//加载http模块
var session = require('express-session');
var flash = require('connect-flash');
var formidable = require("formidable");
var MongoStore = require('connect-mongo')(session);
var cookieSession =require('cookie-session');
var multiparty = require('connect-multiparty');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置视图文件夹路径
app.set('view engine', 'ejs');//设置模板引擎为ejs，也可以是其它的，比如jade
app.use(flash());
app.use(favicon());//和系统favicon有关信息

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//使用bodyParser过滤器，并且指定上传的目录为public/upload，注意这里的目录为相对于express框架app运行的路径，或者指定绝对路径。
app.use(multiparty({uploadDir:'public/uploads/photo', keepExtensions:true})); 
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db
  })
}));
//设置资源文件（public）的路径
app.use(express.static(path.join(__dirname, 'public')));
//配置路由规则
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {//开发模式下使用
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
