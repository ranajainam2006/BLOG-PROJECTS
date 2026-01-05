const User = require('../models/user.model')

const { hashToPlain, plainToHash } = require('../utils/password.js')

const sendMailer = require('../config/mailer.js')
const otpGenerator = require('otp-generator')
const { forgotUi } = require('../utils/mailFormate.js')



exports.signUp = async (req, res) => {

    try {

        console.log(req.body)

        const { u_name, u_email, u_mobile, u_password } = req.body

        const hashPass = await plainToHash(u_password)

        await User.create({ u_name, u_email, u_mobile, u_password: hashPass })


        res.json({
            success: true,
            message: "SignUp Successfully..Yo!.."
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })

    }


}


exports.logIn = async (req, res) => {

    try {
        const { u_email, u_password } = req.body

        const userExist = await User.findOne({ u_email })

        if (!userExist) {
            return res.json({
                success: false,
                message: "Email Not Found..."
            })
        }

        const match = await hashToPlain(u_password, userExist?.u_password)


        if (!match) {
            return res.json({
                success: false,
                message: "Password Not Match..."
            })
        }



        const payload = {
            id: userExist?._id,
            email_id: userExist?.u_email
        }

        req.session.user = {
            ...payload,
            loginAt: new Date()
        }

        res.json({
            success: true,
            message: "LogIn Successfully....",
        })



    } catch (error) {


        res.json({
            success: false,
            message: error.message
        })

    }

}




exports.checkAuth = async (req, res) => {

    const token = req.session.user

    console.log(token);

    if (!token) {
        return res.json({
            success: false,
            user: null
        })
    }

    res.json({
        success: true,
        user: token
    })


}




exports.changePassword = async (req, res) => {

    // console.log(req.session.user)

    console.log("this is ypur from fornted...", req.body)

    const { curr_pass, new_pass } = req.body

    const { id } = req.session.user;

    const existUser = await User.findById(id)


    if (!existUser) {
        return res.json({
            success: false,
            message: "User Not Found..."
        })
    }

    const match = await hashToPlain(curr_pass, existUser.u_password)


    if (!match) {
        return res.json({
            success: false,
            message: "Current Password doesn't match..."
        })
    } else {

        const hash_pass = await plainToHash(new_pass)
        console.log(hash_pass);

        await User.findByIdAndUpdate(id, {
            u_password: hash_pass,
        })

      return res.json({
            success: true,
            message: "Your Password has been updated...."
        })

    }




}




exports.sendOtp = async (req, res) =>{

    const {u_email} = req.body

    const userExist = await User.findOne({u_email})

    // res.json(userExist)

    if(!userExist){
        return res.json({
            success:false,
            message:"Email id not exist.."
        })
    }
    

    const otp = otpGenerator.generate(6,{digits:false})

    const user = await User.updateOne({u_email},{otp})

    await sendMailer(u_email, 'otp for forget password..', forgotUi(otp))


    res.json({
        success:true,
        message:"otp sent, check your email.."
    })
 

}




exports.updatePassword = async (req,res) =>{

    const {otp, new_pass} = req.body

    const userExist = await User.findOne({otp})

    if(!userExist){
        return res.json({
            success:false,
            message : "otp nor match !"
        })
    }

    const hash_pass = await plainToHash(new_pass)

    await User.findByIdAndUpdate(userExist._id, {u_password :hash_pass, otp:""})

    res.json({
        success:true,
        message:"Your Password has been updated.."
    })


}





