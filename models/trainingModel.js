const mongoose = require('mongoose');
//trainingName
//startDate
//endDate

//employee
//completionDate
//certificate
//createdAt
// updatedAt
//isDeleted
//deletedAt

const trainingSchema = new mongoose.Schema({
  trainingName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  employee: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Employee',
  },
  completionDate: {
    type: Date,
  },
  certificate: String,
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: Date,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
