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

module.exports = Project;