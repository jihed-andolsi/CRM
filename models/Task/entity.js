var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    estimated_days: Number,
    id_employee: { type : mongoose.Schema.Types.ObjectId, default : null }, // foreign key for class Employee
    id_project: { type : mongoose.Schema.Types.ObjectId, default : null } // foreign key for class Project
});
module.exports = mongoose.model('Task', taskSchema);