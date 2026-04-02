const { Booking, Event, User } = require('../models');

exports.getAnalytics = async (req, res) => {
  try {
    const totalEvents = await Event.count();
    const totalBookings = await Booking.count({ where: { status: 'confirmed' } });
    const totalUsers = await User.count({ where: { role: 'student' } });

    const events = await Event.findAll();
    let totalSeats = 0;
    let availableSeats = 0;

    events.forEach(event => {
      totalSeats += event.totalSeats;
      availableSeats += event.availableSeats;
    });

    const revenueEstimate = totalBookings * 100;

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        totalBookings,
        totalUsers,
        totalSeats,
        availableSeats,
        revenueEstimate
      }
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ 
          where: { role: 'student' },
          attributes: { exclude: ['password'] }
        });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}
