const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  themePreference: {
    type: String,
    default: 'light', // Assuming default theme preference is 'light'
  },
  primaryColor: {
    type: String,
    default: '#1976d2',
  },
});

module.exports = mongoose.model('Theme', themeSchema);

