const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const AppError = require('./utils/appError');

// Load environment variables from .env file dotenv.config();
dotenv.config();

const app = express();

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

//Connect to database

//Routing handlers
app.use('/', (req, res) => res.send('anh trai say bye'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
