const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Museum = require('../models/Museum');

// @route   GET api/museums
// @desc    Get all museums
// @access  Public
router.get('/', async (req, res) => {
    try {
        const museums = await Museum.find().sort({ createdAt: -1 });
        res.json(museums);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/museums/:id
// @desc    Get museum by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const museum = await Museum.findById(req.params.id);
        if (!museum) {
            return res.status(404).json({ msg: 'Museum not found' });
        }
        res.json(museum);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Museum not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/museums
// @desc    Create a museum
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newMuseum = new Museum({
            title: req.body.title,
            country: req.body.country,
            city: req.body.city,
            category: req.body.category,
            summary: req.body.summary,
            content: req.body.content,
            photos: req.body.photos,
            videoUrl: req.body.videoUrl,
            ratings: req.body.ratings
        });

        const museum = await newMuseum.save();
        res.json(museum);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/museums/:id
// @desc    Update museum
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let museum = await Museum.findById(req.params.id);
        if (!museum) return res.status(404).json({ msg: 'Museum not found' });

        // Update fields
        const { title, country, city, category, summary, content, photos, videoUrl, ratings } = req.body;
        if (title) museum.title = title;
        if (country) museum.country = country;
        if (city) museum.city = city;
        if (category) museum.category = category;
        if (summary) museum.summary = summary;
        if (content) museum.content = content;
        if (photos) museum.photos = photos;
        if (videoUrl !== undefined) museum.videoUrl = videoUrl;
        if (ratings) museum.ratings = ratings;

        await museum.save();
        res.json(museum);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/museums/:id
// @desc    Delete museum
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const museum = await Museum.findById(req.params.id);
        if (!museum) {
            return res.status(404).json({ msg: 'Museum not found' });
        }

        await museum.deleteOne();
        res.json({ msg: 'Museum removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Museum not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
