var Employee = require ('./entity');
Employee.create = function(first_name, last_name, id_supervisor, callback){
    var employee = new Employee({
        first_name: first_name,
        last_name: last_name,
        id_supervisor: id_supervisor
    });
    employee.save(function(err) {
        callback(err, true);
    });
}

Employee.getAll = function(callback){
    Employee.find({}, function (err, employees) {
        employees = JSON.parse(JSON.stringify(employees));
        callback(err, employees);
    });
}
module.exports = Employee;

