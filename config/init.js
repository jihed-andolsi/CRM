var mongoose = require('mongoose');
var db = require('./db');
module.exports = {
	start: function(){
		mongoose.connect(db.url);
	}
}