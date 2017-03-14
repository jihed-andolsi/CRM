var mongoose = require('mongoose');
var db = require('./db');
module.exports = {
	start: function(){
		mongoose.Promise = global.Promise;
		mongoose.connect(db.url);
	}
}