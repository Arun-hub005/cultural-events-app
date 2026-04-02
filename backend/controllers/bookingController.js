const { Booking, Event, User } = require('../models');

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['title', 'date', 'location', 'category']
      }]
    });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ success: false, error: 'Event is fully booked' });
    }

    const existingBooking = await Booking.findOne({ 
      where: { userId: req.user.id, eventId } 
    });

    if (existingBooking && existingBooking.status === 'confirmed') {
      return res.status(400).json({ success: false, error: 'You have already booked tickets for this event' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      paymentStatus: 'completed',
      amountPaid: event.price
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
        return res.status(400).json({ success: false, error: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const event = await Event.findByPk(booking.eventId);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Event, as: 'event', attributes: ['title', 'date'] },
        { model: User, as: 'user', attributes: ['name', 'email'] }
      ]
    });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
