const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

// Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const urlCode = shortid.generate();
    const shortUrl = `http://localhost:5000/${urlCode}`;
    const url = new Url({ longUrl, shortUrl, urlCode });
    await url.save();
    res.json(url);
});

// Redirect short URL
router.get('/:code', async (req, res) => {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) return res.redirect(url.longUrl);
    res.status(404).json('No URL found');
});

module.exports = router;
