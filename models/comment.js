const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
        unique:true
    },

    BlogId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
    },

    createdBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
},
    {timestamps: true}
);

const Comments = mongoose.model("comments",commentSchema);

module.exports = Comments