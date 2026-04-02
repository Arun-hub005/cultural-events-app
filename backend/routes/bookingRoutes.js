const express = require('express');
const { getBookings, createBooking, cancelBooking, getAllBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/all')
  .get(authorize('admin'), getAllBookings);

router.route('/:id')
  .delete(cancelBooking);

module.exports = router;
