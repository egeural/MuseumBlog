const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|webp/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// @route   POST api/upload
// @desc    Upload an image
// @access  Public (or Private)
router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ msg: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ msg: 'No File Selected!' });
            } else {
                res.json({
                    msg: 'File Uploaded!',
                    filePath: `/uploads/${req.file.filename}`
                });
            }
        }
    });
});

module.exports = router;
