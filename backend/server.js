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
const allowedOrigins = [
  'https://job-portal-kpvv.onrender.com',
  'http://localhost:5000', // ✅ Local testing ke liye
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // ✅ Agar origin `null` hai (Postman ya direct browser request), tab bhi allow hoga
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
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
