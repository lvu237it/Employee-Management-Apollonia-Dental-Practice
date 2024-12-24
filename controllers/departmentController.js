const Department = require('../models/departmentModel');

exports.getAllDepartments = async (req, res) => {
  try {
    const results = await Department.find();
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};
