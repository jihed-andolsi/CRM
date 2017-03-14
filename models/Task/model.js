var moment = require('moment');
var Task = require ('./entity');
var Project = require('./../Project/model');
Task.create = function(name, description, estimated_days, callback){
    var task = new Task({
        name: name,
        description: description,
        estimated_days: estimated_days
    });
    task.save(function(err) {
        callback(err, true);
    });
}
Task.adjustEstimatedDays = function(id_task, estimated_days, callback){
    Task.findOne({'_id':id_task}, function (err, task) {
        if(task){
            task.estimated_days = estimated_days;
            task.save(function(err) {
                callback(err, true);
            });
        } else {
            callback(err, false);
        }
    })
}
Task.assginToProject = function(id_task, id_project, callback){
    Task.findOne({'_id':id_task}, function (err, task) {
        if(task){
            Project.getById(id_project, function (err, project) {
                if(project){
                    var estimated_days = task.estimated_days;
                    task.id_project = id_project;
                    task.save(function(err) {
                        if(!err){
                            project.end_date = moment((project.end_date) ? project.end_date : Date.now).add(((estimated_days) ? estimated_days : 0), 'days').toDate();
                            project.save(function(err) {
                                callback(err, true);
                            })
                        } else {
                            callback(err, false);
                        }
                    });
                } else {
                    callback(err, project);
                }
            })
        } else {
            callback(err, task);
        }
    })
}
Task.getAll = function(callback){
    Task.find({}, function (err, tasks) {
        tasks = JSON.parse(JSON.stringify(tasks));
        callback(err, tasks);
    });
}

module.exports = Task;