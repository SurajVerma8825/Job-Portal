const Company = require('../models/companyModel');
const Job = require('../models/JobModel.js');
const cloudinary = require('../utils/cloudinary.js');
const getDataUri = require('../utils/dataUri');

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res
        .status(400)
        .json({ error: 'Company name is required', success: false });
    }

    // Use await to ensure the database query is completed
    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res
        .status(400)
        .json({ error: 'Company already exists', success: false });
    }

    // Create a new company if it doesn't exist
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: 'Company registered successfully',
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

const getCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res
        .status(404)
        .json({ error: 'No companies found', success: false });
    }

    return res.status(200).json({
      message: 'Companies fetched successfully',
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

const getCompanyByID = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await Company.findById(companyID);

    if (!company) {
      return res
        .status(404)
        .json({ error: 'Company not found', success: false });
    }

    return res.status(200).json({
      message: 'Company fetched successfully',
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileURI = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content);

    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ error: 'Company not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Company information updated', success: true, company });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyID = req.params.id;
    

    const company = await Company.findById(companyID);

    if (!company) {
      return res
        .status(404)
        .json({ error: 'Company not found', success: false });
    }

    await Job.deleteMany({ company: companyID });

    await Company.deleteOne({ _id: companyID });

    return res
      .status(200)
      .json({ message: 'Company deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};



module.exports = {
  registerCompany,
  getCompanies,
  getCompanyByID,
  updateCompany,
  deleteCompany,
};
