var async = require ('async');
var Employee = require ('./entity');
Employee.createEmployee = function(first_name, last_name, id_supervisor){
    async.waterfall([
        function(callback) {
            var employee = new Employee({
                first_name: first_name,
                last_name: last_name,
                id_supervisor: id_supervisor
            });
            callback(null, employee);
        },
        function(employee, callback) {
            employee.save(function(err) {
                if (err) {
                    callback(null, false);
                }
                callback(null, true);
            });

        },
    ], function (err, result) {
        return result;
    });
}

Employee.getAllEmployees = function(){
    async.waterfall([
        function(callback) {
            Employee.find({}).exec(function (err, employees) {
                callback(null, employees);
            });
        }
    ], function (err, employees) {
        return employees;
    });
}
module.exports = Employee;

