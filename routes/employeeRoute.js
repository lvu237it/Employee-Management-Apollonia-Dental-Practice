const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');

employeeRouter.get('/', employeeController.getAllEmployees);
employeeRouter.get(
  '/by-department-name',
  employeeController.getEmployeesByDepartmentName
);

module.exports = employeeRouter;
