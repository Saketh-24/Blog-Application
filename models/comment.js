const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },

    BlogId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
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