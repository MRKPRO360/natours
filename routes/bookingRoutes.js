const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  deleteBooking,
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
} = require('../controller/bookingController');

const router = express.Router();

router.use(protect, restrictTo('admin', 'lead-guide'));

router.get('/checkout-session/:tourId', getCheckoutSession);

router.route('/').get(getAllBookings).post(createBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
