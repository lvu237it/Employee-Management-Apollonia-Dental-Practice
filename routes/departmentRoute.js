const express = require('express');
const departmentRouter = express.Router();
const departmentController = require('../controllers/departmentController');

departmentRouter.get('/', departmentController.getAllDepartments);

module.exports = departmentRouter;
