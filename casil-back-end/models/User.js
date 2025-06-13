// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  type: {
    type: String,
    enum: ["admin", "editor", "viewer"], 
    required: true,
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
