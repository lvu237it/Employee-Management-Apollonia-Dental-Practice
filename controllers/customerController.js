const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
  try {
    const results = await Customer.find();
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

exports.checkCustomerEmailIsExist = async (email) => {
  try {
    const customer = await Customer.findOne({ 'contactInfo.email': email });
    if (customer) {
      return true;
    }

    return false;
  } catch (err) {
    throw new Error('Error checking customer email');
  }
};

exports.checkCustomerPhoneNumberIsExist = async (phoneNumber) => {
  try {
    const customer = await Customer.findOne({
      'contactInfo.phone': phoneNumber,
    });
    if (customer) {
      return true;
    }

    return false;
  } catch (err) {
    throw new Error('Error checking customer phone number');
  }
};

exports.findCustomerByEmail = async (email) => {
  try {
    const result = Customer.findOne({ 'contactInfo.email': email });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    throw new Error('Error finding customer by email');
  }
};
