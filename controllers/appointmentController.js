const Appointment = require('../models/appointmentModel');
const Customer = require('../models/customerModel');
const customerController = require('../controllers/customerController');

exports.createAnAppointment = async (req, res) => {
  try {
    const { firstName, lastName, age, phone, email, appointmentDate, notes } =
      req.body;

    const isExistEmail = customerController.checkCustomerEmailIsExist(email);
    if (isExistEmail) {
      res.json({
        status: 'error',
        message: 'This email is exist. Please choose another.',
      });
    } else {
      // Create new customer
      const newCustomer = await Customer.create({
        firstName,
        lastName,
        age,
        contactInfo: {
          phone,
          email,
        },
      });

      //Create new appointment
      const newAppointment = await Appointment.create({
        customer: newCustomer._id,
        appointmentDate,
        notes,
        createdAt: new Date(),
        updatedAt: null,
        isDeleted: false,
        deletedAt: null,
      });

      res.status(201).json({
        status: 'success',
        data: {
          customer: newCustomer,
          appointment: newAppointment,
        },
      });
    }
  } catch (error) {
    console.log('Error creating an appointment', error);
  }
};
