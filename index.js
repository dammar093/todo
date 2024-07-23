const dotenv = require("dotenv");
const app = require("./src/app")
const path = require("path");
const connectDB = require('./src/config/db');
const express = require("express")

// const app = express()
dotenv.config({
  path:"./.env"
});


connectDB().then(()=>{
  app.use(express.static(path.resolve(__dirname,'build')))
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is runnig on port ${process.env.PORT}`);
  })
})
.catch(()=>{
  console.log("error on db connection");
})
