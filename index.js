require('dotenv').config()
const express = require('express')
const app = express()
const path = require("path")
const userRoute = require("./routes/User")
const dbConnection = require("./database")

app.set('view engine',"ejs")
app.set("views",path.resolve("./views"))

dbConnection(process.env.DB);

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/users",userRoute)
app.get("/",(req,res)=>
{
    res.render("home")
})

app.listen(process.env.PORT,(req,res)=>
{
    console.log(`app running at port ${process.env.PORT}`)
})