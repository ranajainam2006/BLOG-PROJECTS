const Task = require('../models/taskModel')




const Store = async (req, res) => {

    const { category, title } = req.body

     
    const images = req.files.map( ele => ele.filename)

    res.json(images)



    await Task.create({ category, title, task_image:images })
    res.json({
        success: true,
        message: "Task has been created"
    })
}



const index = async (req, res) => {
   
    const records = await Task.find().select({__v:0,})
    // ahi {__v:0} means ke __v nahi aave ahi 0 ni jagya e -1 kari daie to __v matr aavse ena sivay biju badhu hati jase..


     res.json({
        success: true,
        records

    })
   
}



module.exports = { Store, index }