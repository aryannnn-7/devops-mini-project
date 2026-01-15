const mongoose = require('mongoose');

const rightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['cybercrime', 'data-protection', 'student-safety', 'ragging'],
    required: true
  },
  section: {   // 🔹 new field
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Right', rightSchema);
