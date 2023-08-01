const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controller/reviewController');

const router = express.Router({ mergeParams: true });

// POST api/v1/tour/23334/reviews
// GET api/v1/tour/23334/reviews

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

module.exports = router;
