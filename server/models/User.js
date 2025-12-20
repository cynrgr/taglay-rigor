const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  

  type: { type: String, default: 'user' }, 
  
  isActive: { type: Boolean, default: true },


  // age: { type: String },
  // gender: { type: String },
  // contactNumber: { type: String },
  // address: { type: String },
  // username: { type: String },
}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);