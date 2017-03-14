var mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    name: String,
    description: String,
    description: String,
    duration: Number,
    time_estimation: Number,
    id_employee: { type : Number, default : 0 } // foreign key for class employee
});
module.exports = mongoose.model('Banned', employeeSchema);