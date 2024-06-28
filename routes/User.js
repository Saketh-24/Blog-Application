const User = require('../models/userModel')
const router = require('express').Router();
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')

router.get("/signin",(req,res)=>
    {
        res.render("Signin")
    }
)

router.get("/signup",(req,res)=>
    {
        res.render("SignUp")
    }
)

router.post("/signin",jwtAuthentication,async (req,res)=>
    {
        const newToken = token.sign
    })

router.post("/signup",async (req,res)=>
{
    const {fullname,email,password} = req.body;
    await User.create({
        fullname,
        email,
        password
    })
    res.redirect("/users/signin")
});

async function jwtAuthentication(req,res,next){
    const {email,password} = req.body;
    const userlogin = await User.findOne({email:email})
    if(!userlogin)
        {
            return res.send("user with given email doesnt exits")
        } 
    else
    {
        if(await bcrypt.compare(password,userlogin.password))
            {  
                res.send("user succesfully loggedin");
                next();
            }
        else
        {
            return  res.send("password incorrect")
        }
    }
}

module.exports = router;