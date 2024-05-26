const mongoose = require('mongoose');
const User = require('../models/User');
const Preference = require('../models/Theme');

// Connect to the test database
beforeAll(async () => {
    const DB_USER = process.env.DB_username;
    //db password
    const PASSWORD = process.env.DB_password;
    // DB name
    const NAME=process.env.DB_name;
    //connection string
    const url = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.mms8kwe.mongodb.net/${NAME}`;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
});

// Clean up the database before each test
beforeEach(async () => {
    await Promise.all([
        User.deleteMany({}),
        Preference.deleteMany({}),
    ]);
});

// Disconnect from the database after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});