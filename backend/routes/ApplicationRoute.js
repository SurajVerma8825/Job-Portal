const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const {
  applyJob,
  getAppliedJobs,
  getApplicatns,
  updateStatus,
} = require('../controllers/applicationController');

const applicationRouter = express.Router();

applicationRouter.get('/apply/:id', isAuthenticated, applyJob);

applicationRouter.get('/appliedjobs', isAuthenticated, getAppliedJobs);

applicationRouter.get('/:id/applicants', isAuthenticated, getApplicatns);

applicationRouter.post('/status/:id/update', isAuthenticated, updateStatus);

module.exports = applicationRouter;
