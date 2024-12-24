const Employee = require('../models/employeeModel');
const Department = require('../models/departmentModel');

exports.getAllEmployees = async (req, res) => {
  try {
    const results = await Employee.find({});
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

exports.getEmployeesByDepartmentName = async (req, res) => {
  try {
    const { departmentName } = req.body;
    const results = await Department.find({ name: departmentName })
      .select('employees -_id')
      .populate({ path: 'employees' });

    const finalResult = results[0].employees.map((employee) => {
      return employee;
    });

    res.json(finalResult);
  } catch (err) {
    console.log(err);
  }
};
