function User(username, password, email) {
	this.username = username; 
	this.password = password;
	this.email = email;
	this.headurl = '';
	this.realname = '';
	this.gender = '';
	this.personInfo = '';
}

module.exports = User;




























// User.prototype.save = function (callback) { // 存入 Mongodb 文档
// 	var user = this;
// 	mongodb.open(function(err, db) {
//		if (err) {
// 			return callback(err);
// 		}
// 		// 读取 users 集合
// 		db.collection('users', function(err, collection) {
// 			if (err) {
// 				mongodb.close();
// 				return callback(err);
// 			}
			
// 			// 写入 user 文档 
// 			collection.insert(user, {
// 				safe: true
// 			}, function(err, user) {
// 				mongodb.close();
// 				callback(err, user);
// 			});
// 		});
// 	});
// };
User.get = function (username, callback) {








	/*mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取 users 集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 查找 name 属性为 username 的文档
			collection.findOne({
				name: username
			}, function(err, data) {
				mongodb.close();
				if (data) {
					// 封装为 User 对象
					var user = new User(data.name, data.password);
					callback(err, user);
				} else {
					callback(err, null);
				}
			});
		});
	});*/
};