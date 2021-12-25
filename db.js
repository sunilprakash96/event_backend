const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.DB).then(() => {
    console.log('Connected to mongodb');
  }).catch((err) => {
    console.log("Failed to connect mongodb");
  })
}

module.exports = connectDB;