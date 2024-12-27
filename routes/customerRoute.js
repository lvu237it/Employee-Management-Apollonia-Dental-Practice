const express = require('express');
const customerRouter = express.Router();

const customerController = require('../controllers/customerController');
customerRouter.get('/', customerController.getAllCustomers);

module.exports = customerRouter;
