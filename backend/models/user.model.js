const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    profileImage: { type: String },
  },
  { timestamps: true }
);

const users = mongoose.model('User', userSchema);
module.exports = users;
