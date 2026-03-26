import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: String,
  time: String,
  location: String,
  description: String,
  image: String,
  organizerId: String,
  organizerName: String,
  registrationCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  details: {
    eligibility: String,
    prizes: String,
    timeline: {
      registrationOpens: String,
      registrationCloses: String,
      eventBegins: String,
      eventEnds: String,
      winnersAnnouncement: String
    }
  }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);