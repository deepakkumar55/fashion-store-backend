const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

app.use(cors())
const app = express()
var whitelist = ['https://fashion-store-frontend-dun.vercel.app','https://fashion-store-frontend-hymnt0sib-deepakkumar55s-projects.vercel.app', 'https://fashion-store-frontend-git-main-deepakkumar55s-projects.vercel.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(express.json())
app.use(cookieParser())

app.use(express.static('build'))

app.use("/api",router)

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
