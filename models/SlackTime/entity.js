var mongoose = require('mongoose');
var slackTimeSchema = new mongoose.Schema({
    duration: Number,
    id_project: { type : Number, default : 0 } // foreign key for class project
});
module.exports = mongoose.model('SlackTime', slackTimeSchema);