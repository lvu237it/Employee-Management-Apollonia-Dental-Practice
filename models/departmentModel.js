const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  costPerService: {
    type: Number,
    required: true,
  },
  employees: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Employee',
    },
  ],
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
