import mongoose from "mongoose";
import { dbName } from "./constant.js";
const connectDB = async () => {
try {
    const connectionInstance = await mongoose.connect(
  `${process.env.MONGODB_URI}/${dbName}`
    );
    console.log("MONGODB connected");
  } catch (error) {
    console.log("MONGODB connection FAILED ");
    process.exit(1);
  }
};

export default connectDB;
