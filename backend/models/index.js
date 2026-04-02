const { sequelize } = require('../config/db');
const User = require('./User');
const Event = require('./Event');
const Booking = require('./Booking');

// Associations
User.hasMany(Booking, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false }, as: 'user' });

Event.hasMany(Booking, { foreignKey: { name: 'eventId', allowNull: false }, onDelete: 'CASCADE', as: 'bookings' });
Booking.belongsTo(Event, { foreignKey: { name: 'eventId', allowNull: false }, as: 'event' });

const db = {
  sequelize,
  User,
  Event,
  Booking
};

module.exports = db;
