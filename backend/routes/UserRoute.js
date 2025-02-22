const express = require('express');
const {
  signupUser,
  loginUser,
  updateProfile,
  logoutUser,
} = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const singleUpload = require('../middlewares/multer');

const userRouter = express.Router();

userRouter.post('/signup', singleUpload, signupUser);

userRouter.post('/login', loginUser);

userRouter.post(
  '/profile/update',
  isAuthenticated,
  singleUpload,
  updateProfile
);

userRouter.get('/logout', logoutUser);

module.exports = userRouter;
