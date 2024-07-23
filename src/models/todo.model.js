import mongoose, { Mongoose } from "mongoose";

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

export const TODO = mongoose.model("TODO",todoSchema)