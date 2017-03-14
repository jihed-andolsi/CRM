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
            //Task.adjustEstimatedDays('58c86c66f1650c1dac7fbae7', 3, callback);
            //Task.assginToProject('58c86c66f1650c1dac7fbae7', '58c867717c29a10d64953ec1', callback);
        },
        function(projects, callback){
            Task.getAll(callback);
        },
        function(tasks, callback){
            data.tasks = tasks;
            callback(null, true);
        },
    ], function (err, projects) {

        return res.json(data);
    });
});

module.exports = router;
