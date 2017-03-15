var express = require('express');
var router = express.Router();
var async = require('async');

var authenticated = require('./../config/authenticated');
var Employee = require('./../models/Employee/model');
var Project = require('./../models/Project/model');
var Task = require('./../models/Task/model');

/* GET home page. */
router.get('/', authenticated, function (req, res, next) {
    var data = {};
    async.waterfall([
        function (callback) {
            //Employee.create('Andolsi', 'Jihed', '58c85c88ea49c121b4acab59', callback);
            callback(null, true);
        },
        function (result, callback) {
            Employee.getAll(callback);
        },
        function (employees, callback) {
            data.employees = employees;
            //Project.create('Project 1', new Date(), '2', callback);
            callback(null, true);
        },
        function (result, callback) {
            Project.getAll(callback);
        },
        function(projects, callback){
            data.projects = projects;
            //Task.create('Task 1', 'Task 1 must be completed!', 2, callback);
            //Task.adjustEstimatedDays('58c87fae90544b2b28397eec', 3, callback);
            //Task.assginToProject('58c87f9b93ad0e267ceee77c', '58c876e3d8a3f82bd4a92464', callback);
            //Project.assignToEmployee('58c87fae90544b2b28397eec', '58c85e33439fb7068c8f7e2d', callback);
            //Task.delete('58c88072f3b2010bd8777a23', callback);
            //Project.delete('58c876ded8a3f82bd4a92463', callback);
            callback(null, true);
        },
        function(projects, callback){
            Task.getAll(callback);
        },

        function(tasks, callback){
            data.tasks = tasks;
            callback(null, true);
        },
        function(result, callback){
            Task.getAllByIdProject('58c876e3d8a3f82bd4a92464', callback);
        },
        function(tasks, callback){
            data.tasksForGivenProject = tasks;
            callback(null, true);
        },
        function(tasks, callback){
            Task.getTotalDaysNeeded(["58c876e3d8a3f82bd4a92464", "58c87f9b93ad0e267ceee77c"] , callback);
        },
        function(tasks, callback){
            data.estimatedForList = tasks;
            callback(null, true);
        },
    ], function (err, projects) {

        return res.json(data);
    });
});

module.exports = router;
