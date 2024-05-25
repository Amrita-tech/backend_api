const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const preferenceRoutes = require('./routes/preference');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const setupSwagger=require('./swagger');
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/preference', preferenceRoutes);
setupSwagger(app);
module.exports = app;
