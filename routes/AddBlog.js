const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');
const validateToken = require('../utils/authentication');
const { checkCookie } = require('../middleware/authentication');

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

router.get('/',checkCookie("token"), async (req, res) => {
  try {
    if(req.cookies["token"])
      {
        return res.render('AddBlog', { user: req.user })
      }
    else
    {
      return res.render('Signin')
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred');
  }
});


router.get('/:id',checkCookie("token"), async (req, res) => {
  try {
    if(req.cookies["token"])
      {
        const viewblog = await Blog.findById(req.params.id).populate("createdBy");
        return res.render('viewBlog', { blog: viewblog, user: req.user })
      }
    else
    {
      return res.render('Signin')
    }
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
      ImageURL:`/uploads/${req.file.filename}`,
      createdBy: req.user._id,
    });
    return res.redirect(`/addBlog/${blog._id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while creating the blog');
  }
});

module.exports = router;


