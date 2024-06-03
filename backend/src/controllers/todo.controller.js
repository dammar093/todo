import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { TODO } from "../models/todo.model.js";

const addTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;
  if (todo.trim() === "") {
    return new ApiError(400, "Todo is required!");
  }
  try {
    const todoRes = await TODO.create({ todo });
    return res
      .status(200)
      .json(new ApiResponse(200, "Todo created sucessfully"));
  } catch (error) {}
});
const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await TODO.find({});
    console.log(todos);
    return res.status(200).json(new ApiResponse(200, todos));
  } catch (err) {
    console.log("error", err);
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const data = await TODO.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, "deleted successfully"));
  } catch (err) {
    console.log(err);
  }
});

const updateTodo = asyncHandler(async(req,res)=>{
  try {
    const {_id,todo,isComplete}= req.body
      const data =await  TODO.findByIdAndUpdate(_id,{
      $set:{
        todo,
        isComplete
      }
    })
    console.log(data);
    return res.status(200)
    .json(
      new ApiResponse(200,"updated sucessfully")
    )
  } catch (error) {
    
  }
})
export { getTodos, deleteTodo, addTodo,updateTodo };
