const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    themeColor: { type: String, required: true },
});

module.exports = mongoose.model('Preference', PreferenceSchema);
