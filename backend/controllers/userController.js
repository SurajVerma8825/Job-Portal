const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary.js');

const signupUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    // ✅ Profile Picture Required Condition
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'Profile picture is required', success: false });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User already exists', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Uploading Profile Picture to Cloudinary
    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const profilePhoto = cloudResponse.secure_url;

    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto,
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    if (!email || !role || !password) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found', success: false });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ message: 'Invalid Password', success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: `No account found with the role ${role}`,
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        token,
      });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    return res
      .status(200)
      .json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.error('Logout Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(',');

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();
    return res
      .status(200)
      .json({ message: 'Profile updated successfully', success: true, user });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};

module.exports = { signupUser, loginUser, logoutUser, updateProfile };
