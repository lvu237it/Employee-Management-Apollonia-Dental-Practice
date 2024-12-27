const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require('../controllers/appointmentController');

appointmentRouter.post(
  '/create-new-appointment',
  appointmentController.createAnAppointment
);

module.exports = appointmentRouter;
