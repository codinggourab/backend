import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: {
    type: String,
    enum: ['event_created', 'student_applied']
  },
  timestamp: String,
  read: { type: Boolean, default: false }
});

export default mongoose.model('Notification', notificationSchema);