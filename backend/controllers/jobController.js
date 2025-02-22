const Job = require('../models/JobModel');

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    console.log(
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId
    );

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experienceLevel ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(','),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      created_by: userId,
    });

    await newJob.save();

    return res
      .status(201)
      .json({ message: 'Job created successfully', success: true, newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ' ';
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: 'company',
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: 'No jobs found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Jobs fetched successfully', success: true, jobs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', success: false });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Job fetched successfully', success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', success: false });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
    });

    if (!jobs) {
      return res.status(404).json({ message: 'No jobs found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Jobs fetched successfully', success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

const deleteJobs = async (req, res) => {
  try {
    const jobID = req.params.id;

    const job = await Job.findById(jobID);

    if (!job) {
      return res.status(404).json({ message: 'Job not found', success: false });
    }

    await Job.deleteOne({ _id: jobID });

    return res
      .status(200)
      .json({ message: 'Job deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

module.exports = { postJob, getAllJobs, getJobById, getAdminJobs , deleteJobs };
