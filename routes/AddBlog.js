const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads/'));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    return res.render('AddBlog', { user: req.user })
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
});


router.post('/', upload.single('ImageURL'), async (req, res) => {
  try {
    const { Title, Body } = req.body;
    const blog = await Blog.create({
      Title,
      Body,
      ImageURL: req.file ? `/uploads/${req.file.filename}` : undefined,
      createdBy: req.user._id,
    });
    return res.redirect('/addBlog');
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while creating the blog');
  }
});

module.exports = router;


