const mongoose = require('mongoose');

const MuseumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    photos: [{
        type: String
    }],
    videoUrl: {
        type: String
    },
    ratings: [{
        label: String,
        score: Number // 1-5
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Museum', MuseumSchema);
