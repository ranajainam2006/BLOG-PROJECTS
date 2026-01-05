const {index, Store } = require("../controllers/taskController")
const { verifyAuth } = require("../middleware/verify")
const upload = require("../utils/upload")



const app = require("express")()


app.post('/', verifyAuth, upload.array('task_image', 4) , Store)

app.get('/',verifyAuth, index)



module.exports = app