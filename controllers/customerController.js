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
    const customers = await Customer.find({});
    console.log('customer', customers);

    customers.forEach((customer) => {
      if (customer.contactInfo.email.toString() === email.toString()) {
        return true;
      }
    });

    return false;
  } catch (err) {
    console.log(err);
  }
};
