var Project = require ('./entity');
Project.create = function(name, start_date, slack_time, callback){
    var project = new Project({
        name: name,
        start_date: start_date,
        slack_time: slack_time
    });
    project.save(function(err) {
        callback(err, true);
    });
}
Project.getAll = function(callback){
    Project.find({}, function (err, projects) {
        projects = JSON.parse(JSON.stringify(projects));
        callback(err, projects);
    });
}
Project.getById = function(id_project, callback){
    Project.findOne({'_id':id_project}, function (err, project) {
        callback(err, project);
    })
}
Project.countByIdEmployees = function(id_employee, callback){
    Project.count({'id_employee':id_employee}, function (err, projects_number) {
        callback(err, projects_number);
    })
}
Project.assignToEmployee = function(id_project, id_employee, callback){
    var Employee = require('./../Employee/model');
    Employee.getById(id_employee, function(err, employee){
        if(employee){
            Project.countByIdEmployees(id_employee, function(err, projects_number){
                if(projects_number<=2){
                    Project.getById(id_project, function(err, project){
                        if(project){
                            project.id_employee = id_employee;
                            project.save(function(err) {
                                callback(err, true);
                            });
                        } else {
                            callback(err, project);
                        }
                    })
                } else {
                    callback({error: 'You have a max of two projects!'}, null);
                }
            })
        } else {
            callback(err, employee);
        }
    })
}

Project.removeById = function (id_project, callback) {
    Project.remove({'_id': id_project}, function (err) {
        callback(err, true);
    })
}
Project.delete = function (id_project, callback){
    var Task = require('./../Task/model');
    Project.getById(id_project, function(err, project){
        if(project){
            Project.removeById(id_project, function (err) {
                Task.remmoveAllByIdProject(id_project, function (err) {
                    callback(err, true);
                })
            })
        } else {
            callback(err, project);
        }
    })
}

module.exports = Project;