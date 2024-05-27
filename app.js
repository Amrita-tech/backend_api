
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const themeRoutes = require('./routes/theme');
const userRoutes = require('./routes/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');


const setupSwagger=require('./swagger');
dotenv.config();
connectDB();
const app = express();

app.use(cors());

app.use(express.json());

app.use(compression());

app.use('/api/theme', themeRoutes);
app.use('/api/users', userRoutes);

setupSwagger(app);
module.exports = app;
