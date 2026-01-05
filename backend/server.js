const express = require('express')
const app = express()
// const cookieParser = require('cookie-parser')

const cookieSession = require('cookie-session')


require('dotenv').config()
const PORT = process.env.PORT || 8000


require('./config/db')()


const cors = require('cors')


app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))

// cookie mate
// app.use(cookieParser())
app.use(cookieSession(
    {
        name: 'session',
        keys: [process.env.SECRET_KEY],
  
        maxAge: 60*60*1000 //5 minute..

    }))




app.use(express.json())
app.use(express.urlencoded())



app.use('/profile', express.static('uploads'))



app.get('/', (req, res) => {
    res.send("Server Connected")
})




/// import rounting ///

const blogRoute = require('./routes/blog.route')

const taskRoute = require('./routes/taskRoute')

const userRoute = require('./routes/user.route')





/// setup api routing ///

app.use('/api/blog', blogRoute)

app.use('/api/task', taskRoute)

app.use('/api/user', userRoute)



app.listen(PORT, () => console.log(`server connect http://localhost:${PORT}`))