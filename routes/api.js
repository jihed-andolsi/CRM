var express = require('express');
var router = express.Router();

var authenticated = require('./../config/authenticated');
var Employee = require('./../models/Employee/model');

/* GET home page. */
router.get('/', authenticated, function(req, res, next) {
    Employee.createEmployee('Andolsi', 'Jihed', 1);
    var employees = Employee.getAllEmployees();
    res.json({ employees: employees });
});

module.exports = router;
