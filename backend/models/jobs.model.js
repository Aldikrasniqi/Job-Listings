const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    apiJokeId: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

const jobs = mongoose.model('Job', jobSchema);
module.exports = jobs;
