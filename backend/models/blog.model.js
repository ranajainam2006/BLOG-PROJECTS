const { Schema, model, SchemaType } = require("mongoose");
const common = require("./common");



const blogSchema = new Schema({

    b_title: common,

    user_id:{
        type : Schema.Types.ObjectId,
        ref:'User' //User --> table name
    },

    b_category: common,
    b_desc: {
        ...common,
        required: false
    },
    b_image: {
        ...common,
        required: false
    }
},
    {
        timestamps: true
    })

    

const Blog = model('Blog', blogSchema);
module.exports = Blog