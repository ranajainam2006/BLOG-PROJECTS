const { Schema, model } = require("mongoose");



const taskSchema = new Schema({

    category :{
        type: String,
        trim:true,
        required : [true, "category required.."]
    },
    title :{
        type: String,
        trim:true,
        required : [true, "title required.."]
    },
    task_image :{
        type:[String]
    }
       
    },
    {
        timestamps:true
    })

    

const Task = model('Task', taskSchema);
module.exports = Task