const express = require('express');
const crypto = require('crypto');
const { login, verify } = require('../middleware/adminAuth');
const router = express.Router();

// Models are created lazily in index.js (Create_Schema), so resolve them per request.
const models = {
  movies: () => require('../model/content_desc').Content,
  pickups: () => require('../model/movie_pickup').Movie_pickup,
};

const handle = (fn) => async (req, res) => {
  try {
    const Model = models[req.params.resource]?.();
    if (!Model) return res.status(404).json({ error: 'Unknown resource' });
    const out = await fn(Model, req);
    if (out === null) return res.status(404).json({ error: 'Not found' });
    res.json(out);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

router.post('/login', login);
router.use(verify);

// Signed-upload params so the browser can send files straight to Cloudinary
router.get('/upload/signature', (req, res) => {
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: secret } = process.env;
  if (!cloudName || !apiKey || !secret) {
    return res.status(500).json({ error: 'Cloudinary env vars are not set on the server' });
  }
  const timestamp = Math.round(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_FOLDER || 'ami_watch';
  const signature = crypto.createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest('hex');
  res.json({ cloudName, apiKey, timestamp, folder, signature });
});

router.get('/:resource', handle((M) => M.find({}).sort({ createdAt: -1 })));
router.post('/:resource', handle((M, req) => M.create(req.body)));
router.put('/:resource/:id', handle((M, req) =>
  M.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })));
router.delete('/:resource/:id', handle((M, req) => M.findByIdAndDelete(req.params.id)));

module.exports = router;
