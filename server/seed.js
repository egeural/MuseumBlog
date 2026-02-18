const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log('MONGO_URI not defined. Skipping seed.');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Check if admin exists
        let admin = await User.findOne({ username: 'admin' });
        if (admin) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt); // Default password

        admin = new User({
            username: 'admin',
            password: passwordHash,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: admin123'); // In real app, log to secure channel or email
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
