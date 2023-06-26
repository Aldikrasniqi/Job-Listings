const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    companies: {
      type: String,
    },
    city: {
      type: String,
    },
    jobListExpires: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobs = mongoose.model('Job', jobSchema);
module.exports = jobs;
