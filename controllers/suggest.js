var suggestModel = require('../models/suggest_model');
var Suggest = require('../models/suggest');
exports.addSuggest = function(req, res){
	var suggestName = req.body.suggestName;
	var suggestContent = req.body.suggestContent;
	var suggest = new Suggest();
	suggest.suggestName = suggestName;
	suggest.suggestContent = suggestContent;
	suggestModel.add(suggest, function(err,doc){
		res.redirect('/enjoy');
	});
}