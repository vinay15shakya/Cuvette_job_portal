const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, required: true }, // Could be "Junior", "Mid", "Senior", etc.
  candidateEmail: { type: String, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Links the job to the user who created it
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
