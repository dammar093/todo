const mongoose = require("mongoose");
const dbName = require('./constant')
const connectDB = async () => {
try {
    const connectionInstance = await mongoose.connect(`mongodb+srv://dammarrana093:todo@todo.vfoubbh.mongodb.net/${dbName}`
    );
    console.log("MONGODB connected");
  } catch (error) {
    console.log("MONGODB connection FAILED ");
    process.exit(1);
  }
};

module.exports = connectDB;
