const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { createToken } = require('../utils/authentication');

router.get("/signin", (req, res) => {
    res.render("Signin");
});

router.get("/signup", (req, res) => {
    res.render("SignUp");
});

 

router.post("/signin", Authentication, (req, res) => {
    const token = createToken(req.user);
    res.cookie("token", token).render("home");
});

router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });
        res.redirect("/users/signin");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during sign-up");
    }
});

async function Authentication(req, res, next) {
        const { email, password } = req.body;
        try {
            const userlogin = await User.findOne({ email: email });
            if (!userlogin) {
                throw new Error("User with given email doesn't exist");
            }
    
            const isMatch = await bcrypt.compare(password, userlogin.password);
            if (!isMatch) {
                throw new Error("Password incorrect");
            }
    
            req.user = userlogin;
            next();
        } catch (error) {
            res.render("Signin",{error:"Invalid email or password"})
        }
        
    }

module.exports = router;
