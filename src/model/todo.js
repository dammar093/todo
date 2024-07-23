const mongoose = require('mongoose');

const todoSchema =  new mongoose.Schema(
  {
   todo:{
    type:String,
    required:true
   },
   isComplete:{
    type:Boolean,
    default:false
   }
  },
  {
    timestamps:true
  }
)
const TODO = mongoose.model("TODO",todoSchema)
module.exports = TODO