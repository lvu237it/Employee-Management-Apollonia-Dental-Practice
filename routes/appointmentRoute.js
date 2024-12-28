const express = require('express');
const appointmentRouter = express.Router();
const appointmentController = require('../controllers/appointmentController');

appointmentRouter.get('/', appointmentController.getAllAppointments);
appointmentRouter.get(
  '/populated-customer',
  appointmentController.getAllAppointmentsWithPopulatedCustomer
);

appointmentRouter.post(
  '/create-new-appointment',
  appointmentController.createAnAppointment
);

appointmentRouter.post(
  '/create-appointment-with-available-customer',
  appointmentController.createAppointmentWithAvailableCustomer
);

module.exports = appointmentRouter;
