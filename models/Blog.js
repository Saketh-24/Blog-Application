const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    Title: {
        type:String,
        required:true,
    },
    Body:{
        type:String,
        required:true,
        unique:true
    },
    ImageURL:{
        type:String,
        required:false,
    },
    createdBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
},
    {timestamps: true}
);

const Blogs = mongoose.model("blogs",BlogSchema);

module.exports = Blogs