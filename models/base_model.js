function BaseModel() {

}

module.exports = BaseModel;

BaseModel.prototype.save = function(table, callback) {
	var me = this;
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取集合
		db.collection(table, function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			
			// insert
			collection.insert(me.obj, {
				safe: true
			}, function(err, me.obj) {
				mongodb.close();
				callback(err, me.obj);
			});
		});
	});
}