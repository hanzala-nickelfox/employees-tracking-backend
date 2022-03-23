const express = require('express');
const app = express();
//const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ConnectToMongoDB = require("./config/database/db");

const authRoutes = require('./api/routes/authRoutes')

dotenv.config();
//app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const url = process.env.URL || 5000;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
  
app.use('/api/auth',authRoutes);


ConnectToMongoDB();
app.listen(port, ()=>{console.log(`Listening to port number ${port}`)});