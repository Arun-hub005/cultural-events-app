require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const db = require('./models');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Sync DB
db.sequelize.sync({ alter: true }).then(async () => {
    console.log("Sequelize tables synchronized");
    
    // Seed Admin Account
    try {
        await db.User.findOrCreate({
            where: { email: 'admin@admin.com' },
            defaults: {
                name: 'System Admin',
                password: 'admin123',
                role: 'admin'
            }
        });
        console.log("Admin account seeded successfully (admin@admin.com / admin123)");
    } catch (err) {
        console.error("Failed to seed admin user:", err.message);
    }
}).catch(err => {
    console.error("Sequelize sync error:", err);
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
