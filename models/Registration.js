import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: String,
  studentId: String,
  studentName: String,
  studentEmail: String,
  studentDept: String,
  studentYear: String,
  studentRoll: String,
  timestamp: String
});

export default mongoose.model('Registration', registrationSchema);