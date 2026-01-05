const Blog = require("../models/blog.model")
const path = require('path')
const fs = require('fs')


exports.store = async (req, res) => {

    const { b_title, b_category, b_desc } = req.body
    console.log(req.body)
    // res.send(req.file)



    console.log(req.session.user)

    const user = req.session.user


    await Blog.create({ user_id: user.id, b_title, b_category, b_desc, b_image: req.file.filename })

    res.json("Blog Created")
}




exports.index = async (req, res) => {

    const user = req.session.user

    //========== mam no code

    const records = await Blog.find({ user_id: user.id }).populate({
        path:'user_id',
        select:'-otp -u_password -__v'
    })

    // ahi uparnama {user_id : user.id} means ke je login hase teno j data batavse jo aa {user_id : user.id} hatavi daisu to badha j user no data batavse
    //ajo populate ma otp, u_password ane -__v aavse nahi.."Not Included.." and Included mate minus - hatai devu



    // home work na task mate maro logic
    // const records = await Blog.find().populate('user_id')



    if (records.length > 0) {
        res.json({
            success: true,
            records
        })
    } else {
        res.json({
            success: true,
            message: "No Records Found"
        })
    }
}



exports.trash = async (req, res) => {
    const { id } = req.params
    const match = await Blog.findById(id)
    if (match) {
        const imgPath = path.join(__dirname, '../uploads', match?.b_image)
        console.log(imgPath)
        fs.unlink(imgPath, async (err) => {
            if (err) {
                res.json({
                    success: true,
                    message: "File Path Is Not Found"
                })
            } else {
                await Blog.findByIdAndDelete(id)
                res.json({
                    success: true,
                    message: "Blog has been deleted"
                })
            }
        })
    } else {
        res.json({
            success: false,
            message: "Blog Not Found"
        })
    }
}




exports.update = async (req, res) => {
    const { id } = req.query;
    console.log(req.body)
    const { b_title, b_category, b_desc } = req.body;
    console.log(req.file)
    console.log(id)
    console.log(req.body)
    await Blog.findByIdAndUpdate(id, { b_title, b_category, b_desc, b_image: req?.file?.filename })
    res.json({
        success: true,
        message: "Blog has been updated"
    })
}