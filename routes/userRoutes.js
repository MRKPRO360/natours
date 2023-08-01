const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadsUserPhoto,
  resizeUserPhoto,
} = require('../controller/userController');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);
router.patch('/updateMyPassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadsUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
