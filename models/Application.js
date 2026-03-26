import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  eventId: String,
  studentName: String,
  email: String,
});

export default mongoose.model("Application", applicationSchema);