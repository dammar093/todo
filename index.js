import app from "./src/app.js";
import dotenv  from "dotenv";
import connectDB from "./src/config/db.js";
dotenv.config({
  path:"./.env"
})

try{
  connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
      console.log(`server is runnig on port ${process.env.PORT}`);
    })
  })
  .catch(()=>{
    console.log("error on db connection");
  })
  
}catch(er){
  console.log(er);
}