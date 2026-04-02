const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: DataTypes.ENUM('Dance', 'Music', 'Drama'),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rules: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (event) => {
      if (event.isNewRecord && event.availableSeats === undefined) {
        event.availableSeats = event.totalSeats;
      }
    }
  }
});

module.exports = Event;
