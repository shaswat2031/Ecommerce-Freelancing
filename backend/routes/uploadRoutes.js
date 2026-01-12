const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');

// Use memory storage to handle file in a buffer before uploading to GridFS manually
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route POST /api/upload
// @desc  Uploads file to DB
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const db = mongoose.connection.db;
        const bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'uploads'
        });

        // Generate a unique filename
        const filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname);

        // Create an upload stream
        const uploadStream = bucket.openUploadStream(filename, {
            contentType: req.file.mimetype
        });

        // Convert buffer to stream and pipe to GridFS
        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        readableStream.pipe(uploadStream)
            .on('error', (error) => {
                console.error(error);
                return res.status(500).json({ message: 'Error uploading file' });
            })
            .on('finish', () => {
                res.send(`/api/upload/${filename}`);
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route GET /api/upload/:filename
// @desc  Display image file
router.get('/:filename', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        // Check if file exists
        const files = await db.collection('uploads.files').find({ filename: req.params.filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        const file = files[0];

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType === 'image/webp') {
            const bucket = new mongoose.mongo.GridFSBucket(db, {
                bucketName: 'uploads'
            });
            const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
            downloadStream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ err: 'No file exists' });
    }
});

module.exports = router;
