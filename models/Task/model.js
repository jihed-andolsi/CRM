var moment = require('moment');
var Task = require('./entity');
Task.create = function (name, description, estimated_days, callback) {
    var task = new Task({
        name: name,
        description: description,
        estimated_days: estimated_days
    });
    task.save(function (err) {
        callback(err, true);
    });
}
Task.adjustEstimatedDays = function (id_task, estimated_days, callback) {
    Task.findOne({'_id': id_task}, function (err, task) {
        if (task) {
            task.estimated_days = estimated_days;
            task.save(function (err) {
                callback(err, true);
            });
        } else {
            callback(err, false);
        }
    })
}
Task.assginToProject = function (id_task, id_project, callback) {
    var Project = require('./../Project/model');
    Task.findOne({'_id': id_task}, function (err, task) {
        if (task) {
            Project.getById(id_project, function (err, project) {
                if (project) {
                    var estimated_days = task.estimated_days;
                    task.id_project = id_project;
                    task.save(function (err) {
                        if (!err) {
                            project.end_date = moment((project.end_date) ? project.end_date : Date.now).add(((estimated_days) ? estimated_days : 0), 'days').toDate();
                            project.save(function (err) {
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
Task.getAll = function (callback) {
    Task.find({}, function (err, tasks) {
        tasks = JSON.parse(JSON.stringify(tasks));
        callback(err, tasks);
    });
}
Task.getAllByIdProject = function (id_project, callback) {
    Task.find({'id_project': id_project}, function (err, tasks) {
        tasks = JSON.parse(JSON.stringify(tasks));
        callback(err, tasks);
    });
}
Task.remmoveAllByIdProject = function (id_project, callback) {
    Task.remove({'id_project': id_project}, function (err) {
        callback(err, true);
    });
}
Task.getById = function (id_task, callback) {
    Task.findOne({'_id': id_task}, function (err, task) {
        callback(err, task);
    })
}

Task.removeById = function (id_task, callback) {
    Task.remove({'_id': id_task}, function (err) {
        callback(err, true);
    })
}

Task.delete = function (id_task, callback) {
    var Project = require('./../Project/model');
    Task.getById(id_task, function (err, task) {
        if (task) {
            var estimated_days = task.estimated_days;
            var id_project = task.id_project;
            Project.getById(id_project, function (err, project) {
                if (project) {
                    project.end_date = moment((project.end_date) ? project.end_date : Date.now).subtract(((estimated_days) ? estimated_days : 0), 'days').toDate();
                    project.save(function (err) {
                        Task.removeById(id_task, function (err) {
                            callback(err, true);
                        })
                    });
                } else {
                    Task.removeById(id_task, function (err) {
                        callback(err, true);
                    })
                }
            })
        } else {
            callback(err, task);
        }
    })
}
Task.getTotalDaysNeeded = function(list_of_project, callback){
    Task.aggregate ([
        { $match: {'id_project': {$in : list_of_project}}},
        {
            $group : {
                _id : "$id_project",
                days: { $sum: "$estimated_days" }
            }
        },
        {$sort:{"_id":1}}
    ]).exec(function (err, projects) {
        var neededDays = 0;
        for(var p in projects){
            if(projects[p].days> neededDays){
                neededDays = projects[p].days;
            }
        }
        callback(err, neededDays);
    });
}
module.exports = Task;