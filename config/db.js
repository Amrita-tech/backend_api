//MongoDb connection File
const mongoose = require('mongoose');
require('dotenv').config();
const DB_USER = process.env.DB_username;
//db password
const PASSWORD = process.env.DB_password;
// DB name
const NAME=process.env.DB_name;
//connection string
const url = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.mms8kwe.mongodb.net/${NAME}`;
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

