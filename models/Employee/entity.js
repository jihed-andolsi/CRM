var mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    id_supervisor: { type : mongoose.Schema.Types.ObjectId, default : null } // foreign key for same class
});
module.exports = mongoose.model('Employee', employeeSchema);