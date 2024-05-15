const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin: 'https://fashion-store-frontend-dun.vercel.app',
    credentials: true
  }));

  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fashion-store-frontend-dun.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
 
  app.get('/api/category-product', async (req, res) => {
    try {
      const response = await fetch('https://fashion-store-backend-kixn.onrender.com/api/category-product');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

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
