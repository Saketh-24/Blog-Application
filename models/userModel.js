const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:"/images/UserAvatar.png"
    },
    role:{
        type:String,
        enum : ["User", "Admin"],
        default: "User"
    }
},
    {timestamps: true}
);

UserSchema.pre('save', async function(next) {
    const user = this; 
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

const User = mongoose.model("user",UserSchema);

module.exports = User