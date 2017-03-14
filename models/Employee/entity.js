var mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    id_supervisor: { type : Number, default : 0 } // foreign key for same class
});
module.exports = mongoose.model('Employee', employeeSchema);