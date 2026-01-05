const { Schema, model } = require("mongoose");
const common = require("./common");



const userSchema = new Schema({

    u_name: common,

    u_email: {
        ...common,
        unique: [true, "Email ID already exist.."]
    },

    u_mobile: {
        ...common,
        unique: [true, "Mobile No already exist.."]
    },
    u_password: common,
    otp:{
       type : String
    },


}, 
{
    timestamps: true,
})


const User = model('User', userSchema)
module.exports = User;