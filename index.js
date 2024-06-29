require('dotenv').config()
const express = require('express')
const app = express()
const path = require("path")
const userRoute = require("./routes/User")
const Blogs = require('./routes/AddBlog')
const Blog = require('./models/Blog');
const dbConnection = require("./database")
const cookiepasrser = require('cookie-parser')
const { checkCookie } = require('./middleware/authentication')


app.set('view engine',"ejs")
app.set("views",path.resolve("./views"))

dbConnection(process.env.DB);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("./public"))

app.use(cookiepasrser())
app.use(checkCookie("token"))

app.use("/users",userRoute)
app.use("/addBlog",Blogs)

app.get("/",async (req,res)=>
{
    const allblogs = await Blog.find({})
    res.render("home",{user:req.user,blogs:allblogs})
})

app.listen(process.env.PORT,(req,res)=>
{
    console.log(`app running at port ${process.env.PORT}`)
})