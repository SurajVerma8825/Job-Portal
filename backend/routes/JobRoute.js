const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  deleteJobs,
} = require('../controllers/jobController');

const jobRoute = express.Router();

jobRoute.post('/addJob', isAuthenticated, postJob);

jobRoute.get('/allJobs', isAuthenticated, getAllJobs);

jobRoute.get('/jobs/:id', isAuthenticated, getJobById);

jobRoute.get('/adminJob', isAuthenticated, getAdminJobs);

jobRoute.delete('/deleteJob/:id', isAuthenticated, deleteJobs);

module.exports = jobRoute;
