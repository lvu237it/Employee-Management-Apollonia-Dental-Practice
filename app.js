const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const connectToDatabase = require('./database/connection');
const path = require('path');
const cors = require('cors');

// Load environment variables from .env file dotenv.config();
dotenv.config();

const app = express();
const employeeRouter = require('./routes/employeeRoute');
const departmentRouter = require('./routes/departmentRoute');
const customerRouter = require('./routes/customerRoute');
const appointmentRouter = require('./routes/appointmentRoute');

const { default: axios } = require('axios');

//Middleware & Static files
app.use(express.urlencoded({ extended: true })); //this will help to get submitted data of form in req.body obj
app.use(express.json());
app.use(express.static('public')); //this will helps to use style.css file

//Development logging
if (process.env.NODE_ENV === 'development') {
  //việc đọc các biến môi trường từ file .env xảy ra duy nhất
  //1 lần, sau đó nó nằm trong process và có thể truy cập ở tất cả mọi nơi

  //morgan: using 3rd-party middleware
  app.use(morgan('dev')); // van la 1 chuc nang phan mem trung gian (middleware)
}

if (process.env.NODE_ENV === 'production') {
  console.log('production environment mode');
}

app.use(cors());

//Import routers
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);
app.use('/customers', customerRouter);
app.use('/appointments', appointmentRouter);

//Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, './public')));

//Connect to database
connectToDatabase();

//Routing handlers
app.use('/home', (req, res) => res.render('home'));

// -------------Employee--------------------
app.get('/employee-management', (req, res) =>
  res.render('employee-management')
);

// -------------Department--------------------
app.get('/department-management', (req, res) =>
  res.render('department-management')
);

// -------------Customer--------------------
app.get('/customer-management', async (req, res) => {
  try {
    //Fetch customer data from API
    const customers = await fetCustomerFromAPI();
    res.render('customer-management', { customers });
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }
});

async function fetCustomerFromAPI() {
  const customers = await axios.get('http://localhost:3000/customers');
  return customers.data;
}

// --------------Appointment----------------
app.get('/appointment-management', async (req, res) => {
  try {
    const customers = await fetCustomerFromAPI();
    const appointments = await fetAppointmentWithPopulatedCustomer();

    res.render('appointment-management', { customers, appointments });
  } catch (error) {
    res.status(500).send('Error fetching appointment data');
  }
});

// app.get('/show-appointment-list', async (req, res) => {
//   try {
//     const appointments = await fetAppointmentFromAPI();
//     console.log('appointment', appointments);
//     res.render('show-appointment-list', { appointments });
//   } catch (error) {
//     res.status(500).send('Error fetching appointment data', error);
//   }
// });

async function fetAppointmentWithPopulatedCustomer() {
  const appointments = await axios.get(
    'http://localhost:3000/appointments/populated-customer'
  );
  return appointments.data;
}

async function fetAppointmentFromAPI() {
  const appointments = await axios.get('http://localhost:3000/appointments');
  return appointments.data;
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
