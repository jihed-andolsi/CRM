var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
    name: String,
    start_date: { type : Date, default : Date.now },
    end_date: { type : Date, default : Date.now },
    slack_time: { type : Number, default : 0 },
    id_employee: { type : mongoose.Schema.Types.ObjectId, default : null } // foreign key for same employee
});
module.exports = mongoose.model('Project', projectSchema);