const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  banner: {
    type: String,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' } });

const Event = mongoose.model("event", schema);

module.exports = Event;