var settings = require('./settings');
var mongodb = require('mongodb');
var	Db = mongodb.Db,
	Connection = mongodb.Connection,
	Server = mongodb.Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {
	safe: true
});