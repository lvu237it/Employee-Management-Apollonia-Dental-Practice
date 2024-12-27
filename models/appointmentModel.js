// Cuộc hẹn:
// nhân viên,
//  bệnh nhân,

//Trường này không chèn trực tiếp vào database mà sẽ dựa vào truy vấn để lấy ra department khi 1 appointment xảy ra
//  services (Array - reference tới Department) (hôm ấy bệnh nhân có nhu cầu khám gì...), phí khám chữa bệnh (của bệnh nhân),

//Trường này không chèn trực tiếp vào database mà dựa vào department để tính
// totalCost

//notes
// createdAt,
// updateAt,
//  isDeleted
//deletedAt

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Employee',
  },
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Customer',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  notes: String,
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
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

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
