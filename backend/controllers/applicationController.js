const Application = require('../models/applicationModel');
const Job = require('../models/JobModel');

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: 'Job is required', success: false });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: 'Already applied for this job', success: false });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    const newApplication = new Application({
      applicant: userId,
      job: jobId,
    });
    await newApplication.save();

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ message: 'Job applied successfully', success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res
        .status(404)
        .json({ message: 'No applied jobs found', success: false });
    }

    return res.status(200).json({
      message: 'Applied jobs fetched successfully',
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};

const getApplicatns = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant',
      },
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    return res.status(200).json({
      message: 'Applicants fetched successfully',
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status || typeof status !== 'string') {
      return res
        .status(400)
        .json({ message: 'Valid status is required', success: false });
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res
        .status(404)
        .json({ message: 'Application not found', success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: 'Application status updated successfully',
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};


module.exports = { applyJob, getAppliedJobs, getApplicatns, updateStatus };
