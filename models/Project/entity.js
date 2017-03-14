var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
    name: { type : Date, default : Date.now },
    start_date: { type : Date, default : Date.now },
    end_date: { type : Date, default : Date.now },
    id_employee: { type : Number, default : 0 } // foreign key for same employee
});
module.exports = mongoose.model('Project', projectSchema);