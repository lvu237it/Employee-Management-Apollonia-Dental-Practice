const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const connectToDatabase = require('./database/connection');
const path = require('path');

// Load environment variables from .env file dotenv.config();
dotenv.config();

const app = express();
const employeeRouter = require('./routes/employeeRoute');
const departmentRouter = require('./routes/departmentRoute');

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

//Import routers
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter);

//Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, './public')));

//Connect to database
connectToDatabase();

//Routing handlers
app.use('/home', (req, res) => res.render('home'));

app.get('/employee-management', (req, res) =>
  res.render('employee-management')
);

app.get('/department-management', (req, res) =>
  res.render('department-management')
);

app.get('/customer-management', (req, res) =>
  res.render('customer-management')
);

app.get('/appointment-management', (req, res) =>
  res.render('appointment-management')
);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
