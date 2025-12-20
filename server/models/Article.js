const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  // NEW FIELD
  author: {
    type: String,
    required: [true, 'Please add the author of the book'], 
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Use 'models.Article' to prevent overwrite errors
module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);