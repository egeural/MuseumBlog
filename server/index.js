const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/museums', require('./routes/museums'));
app.use('/api/upload', require('./routes/upload'));

app.use('/uploads', express.static('uploads'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(require('path').resolve(__dirname, '../client/dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Museum Explorer API is running');
    });
}

// Database Connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log('MONGO_URI not defined, skipping DB connection for now.');
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Do not exit process, just log error
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
