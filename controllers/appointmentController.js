const Appointment = require('../models/appointmentModel');
const Customer = require('../models/customerModel');
const customerController = require('../controllers/customerController');
const validateEmail = require('../utils/validateEmail');

exports.getAllAppointments = async (req, res) => {
  try {
    const results = await Appointment.find({});
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllAppointmentsWithPopulatedCustomer = async (req, res) => {
  try {
    const results = await Appointment.find({}).populate({ path: 'customer' });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

// Create a new appointment
exports.createAnAppointment = async (req, res) => {
  try {
    const { firstName, lastName, age, phone, email, appointmentDate, notes } =
      req.body;

    const isExistEmail = await customerController.checkCustomerEmailIsExist(
      email
    );
    const isExistPhoneNumber =
      await customerController.checkCustomerPhoneNumberIsExist(phone);

    if (isExistPhoneNumber) {
      res.json({
        status: 'error',
        message: 'This phone number is exist. Please input another.',
      });
    } else if (isExistEmail) {
      res.json({
        status: 'error',
        message: 'This email is exist. Please input another.',
      });
    } else {
      if (validateEmail(email)) {
        //Email valid
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
      } else {
        //Email invalid
        res.json({
          status: 'failed',
          message: 'Email is invalid. Please input again.',
        });
      }
    }
  } catch (error) {
    console.log('Error creating an appointment', error);
  }
};

// Create appointment with available customer
exports.createAppointmentWithAvailableCustomer = async (req, res) => {
  try {
    const { email, appointmentDate, notes } = req.body;

    const customerByEmail = await customerController.findCustomerByEmail(email);
    if (customerByEmail) {
      //Create new appointment
      const newAppointment = await Appointment.create({
        customer: customerByEmail._id,
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
          customer: customerByEmail,
          appointment: newAppointment,
        },
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'Email is invalid or not exist.',
      });
    }
  } catch (error) {
    console.log('Error creating an appointment with available customer', error);
  }
};
