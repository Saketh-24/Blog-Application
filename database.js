
const mongoose = require("mongoose")

module.exports= (mongodb)=>{
    mongoose.connect(mongodb)
    .then(()=>{
        console.log("db connected succesfully..")
    })
    .catch((error)=>{
        console.log(error)
    })
}