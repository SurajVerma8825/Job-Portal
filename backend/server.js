require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//! Importing Database Connection and Routes
const connectDB = require('./utils/DB');
const userRouter = require('./routes/UserRoute');
const companyRouter = require('./routes/CompanyRoute');
const jobRouter = require('./routes/JobRoute');
const applicationRouter = require('./routes/ApplicationRoute');

//! Environment Variables
const port = process.env.PORT || 5000;

//! Middleware Configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://job-portal-yljy.vercel.app'], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//! Serving Static Files (Frontend)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//! API Routes
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/job', jobRouter);
app.use('/application', applicationRouter);

//! Serving Frontend for All Other Routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

//! Default Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

//! Connect to Database
connectDB();

//! Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
