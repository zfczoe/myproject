/*
	user controller
*/
var userModel = require('../models/user_model');
var User = require('../models/user');
var crypto = require('crypto');
// var multiparty = require('multiparty');
var multiparty = require('connect-multiparty'); 
exports.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var md5 = crypto.createHash('md5'); 
	var password = md5.update(password).digest('base64'); 
	userModel.getByNameAndPwd(username,password,function(user){
		// console.log(user);
		if(user){
			req.session.loginUser = user;
			req.flash('success', '登陆成功!!！');
			res.redirect('/');
		}else{
			req.flash('noReg', '密码错误!!！');
			res.redirect('/login');
		}
		
	});
}
exports.reg = function(req, res) {
	//1、接收数据
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;
	var email = req.body.email;

	if(password != repassword){
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/reg');
	}
	 var md5 = crypto.createHash('md5'); 
	 var password = md5.update(password).digest('base64'); 
	var user = new User(username, password, email);
	//2、调用model
	userModel.save(user,function(newUser){
	//3、跳转
		// console.log(newUser);
		req.flash('success', '注册成功！');
		res.redirect('/');
	});
	
	// res.send('success');
}
exports.resetPassword = function(req, res){
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	var renewPassword = req.body.renewPassword;
	var oUser = req.session.loginUser;
	var md5 = crypto.createHash('md5'); 
	var oldPassword = md5.update(oldPassword).digest('base64');
	if(oldPassword != oUser.password){
		req.flash('error', '当前密码不正确！');
		return res.redirect('/personCenterResetPwd');
	}
	if(newPassword != renewPassword){
		req.flash('error', '两次输入的密码不一致！');
		return res.redirect('/personCenterResetPwd');
	}else{
		var md5 = crypto.createHash('md5');
		var newPassword = md5.update(newPassword).digest('base64');
		oUser.password = newPassword;
		userModel.update(oldPassword,oUser,function(result){
			req.flash('success', '修改成功！');
			res.redirect('/personCenterResetPwd');
		});
	}
}
exports.uploadHead = function (req, res) {  //  上传头像 
   var patharray = req.files.file.path.split("\\");
   var headUrl = 'uploads/photo/' + patharray[patharray.length-1];
   var oUser = req.session.loginUser;
   userModel.updateUserHead(oUser, headUrl, function(){
   	
   });
   res.send(patharray[patharray.length-1]); 
   // var form = new multiparty.Form();
	
	//  form.parse(req, function(err, fields, files) {
 // 	   var patharray = files.file[0].path.split("\\");
	//    var headUrl = 'uploads/photo/' + patharray[patharray.length-1];
	//    var oUser = req.session.loginUser;
	//    userModel.updateUserHead(oUser, headUrl, function(){
	   	
	//    });
	//    res.send(patharray[patharray.length-1]); 
 //    });
}  
exports.setBasic = function (req, res) {
	var newUser = new User();
  	newUser.realname = req.body.realName;
  	newUser.gender = req.body.gender;
  	newUser.email = req.body.email;
  	newUser.personInfo = req.body.personInfo;
  	var oUser = req.session.loginUser;
  	userModel.updateBasic(newUser, oUser, function(){
  		req.flash('success', '上传成功！');
		res.redirect('/personCenterBasic');
  	});
}

exports.checkUser = function(req, res){
	var username = req.body.username;
	userModel.checkUserName(username,function(user){
		checkResult = user ? '用户已注册！' : '√';
		var flag = user ? '' : '用户未注册！';
		res.json({ result: checkResult, flag: flag });
	});
}


exports.set = function(req,res){
  if (req.method == get) {
        var user = {};
     if(req.session.user){
         user = req.session.user;
     }
    res.render(users/food_add, {title:'发布美食-'+config.name,name:config.name,user:user});
  } else  if (req.method == post) {
    //获取数据
    var x = req.body.x;
    var y = req.body.y;
    var cat_id = req.body.cat_id;
    var cat_name = req.body.cat_name;
    var address = req.body.address;
    var title = req.body.title;
    var desc = req.body.desc;
    var content = req.body.content;
    var pics = '';
    var price = req.body.price;
    var tags = req.body.tags;
    var add_time = date.parse(new date())/1000;
    var support = 0;
    var uid = req.body.uid;
    //处理图片上传
    //console.dir(req.files);
    var file_obj = req.files.pics;
    //console.log(file_obj.length);
    var file_obj2 = [];
    for(var i=0;i<file_obj.length;i++){
        if(file_obj[i].name){
            file_obj2.push(file_obj[i]);
        }
    }
    var length = file_obj2.length;
    if(length>0){
        file_obj2.foreach(function(item,index){
            if(item.path){
            var tmppath = item.path;
            var type = item.type;
            var extension_name = '';
            //移动到指定的目录，一般放到public的images文件下面
            //在移动的时候确定路径已经存在，否则会报错
            var tmp_name = (date.parse(new date())/1000);
            tmp_name = tmp_name+''+(math.round(math.random()*9999));
            //判断文件类型
            switch (type) {
                case 'image/pjpeg':extension_name = 'jpg';
                    break;
                case 'image/jpeg':extension_name = 'jpg';
                    break;
                case 'image/gif':extension_name = 'gif';
                    break;
                case 'image/png':extension_name = 'png';
                    break;
                case 'image/x-png':extension_name = 'png';
                    break;
                case 'image/bmp':extension_name = 'bmp';
                    break;
            }
            var tmp_name = tmp_name+'.'+extension_name;
            var targetpath = 'public/images/' + tmp_name;
            console.log(tmppath);
            //将上传的临时文件移动到指定的目录下
            fs.rename(tmppath, targetpath , function(err) {
                if(err){
                    throw err;
                }
                if(pics){
                    pics += ','+tmp_name;
                }else{
                    pics += tmp_name;
                }
                //判断是否完成
                //console.log(index);
                 //删除临时文件
                fs.unlink(tmppath, function(){
                    if(err) {
                        throw err;
                    }else{
                        if((index+1)==length){
                    console.log(targetpath);
                    //上传处理完成
                    //数据
                    var data = {
                        x:x,//经度
                        y:y,//维度
                        cat_id:cat_id,//分类id
                        cat_name:cat_name,//分类名称
                        address:address,//地址
                        title:title,//标题
                        desc:desc,//简介
                        content:content,//内容
                        pics:pics,//图片字段，以','隔开多张图片
                        price:price,//价格
                        tags:tags,//标签 以','隔开多个
                        add_time:add_time,//支持度
                        support:support,//支持度 默认为0
                        uid:uid//用户id 可匿名
                    };
                    food_predao.insert(data, function (err, food) {
                        if(err){
                            res.json({err:100,content:'数据库错误'});
                        }else{
                            res.json({err:0,content:'发布成功！',data:food});
                        }
                    });
                }
                    }
                });

            });
            }
         });
    }else{
        //没有图片
        //数据
        var data = {
            x:x,//经度
            y:y,//维度
            cat_id:cat_id,//分类id
            cat_name:cat_name,//分类名称
            address:address,//地址
            title:title,//标题
            desc:desc,//简介
            content:content,//内容
            pics:pics,//图片字段，以','隔开多张图片
            price:price,//价格
            tags:tags,//标签 以','隔开多个
            add_time:add_time,//支持度
            support:support,//支持度 默认为0
            uid:uid//用户id 可匿名
        };
        food_predao.insert(data, function (err, food) {
            if(err){
                res.json({err:100,content:'数据库错误'});
            }else{
                res.json({err:0,content:'发布成功！',data:food});
            }
        });
    }

  }
}