const mongoose = require('mongoose');

const mongoDb = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose
      .connect(mongoDb)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error(err));
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};

module.exports = connectDB;
