require('dotenv').config();
const express = require('express');
const app = express();
const cookiParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./utils/DB');
const userRouter = require('./routes/UserRoute');
const companyRouter = require('./routes/CompanyRoute');
const jobRoute = require('./routes/JobRoute');
const applicationRouter = require('./routes/ApplicationRoute');

//! Environment variables for port and MongoDB URI
const port = process.env.PORT || 5000;

//!middilewares
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://job-portal-yljy.vercel.app'],

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

//!Route
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/job', jobRoute);
app.use('/application', applicationRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

connectDB();

//! Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
