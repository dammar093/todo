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
    const response = await TODO.create({ todo });
    return res
      .status(200)
      .json(new ApiResponse(200,response, "Todo created sucessfully"));
  } catch (error) {}
});
const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await TODO.find({});
    // console.log(todos);
    return res.status(200).json(new ApiResponse(200, todos));
  } catch (err) {
    console.log("error", err);
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //  console.log(id);
    const data = await TODO.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json(new ApiResponse(404, "Todo item not found"));
    }

    return res.status(200).json(new ApiResponse(200,data._id, "Deleted successfully"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(new ApiResponse(500, "An error occurred while deleting the todo item"));
  }
});


const updateTodo = asyncHandler(async(req,res)=>{
  try {
     const {_id,todo}= req.body
      const data =await  TODO.findByIdAndUpdate(_id,{
      $set:{
        todo
      }
    })
    return res.status(200)
    .json(
      new ApiResponse(200,"updated sucessfully")
    )
  } catch (error) {
    
  }
})
const updatedIsComplete = asyncHandler(async (req, res) => {
  try {
    const { isComplete,id } = req.body;
    console.log(isComplete,id);
    const data = await TODO.findByIdAndUpdate(id, {
      $set: { isComplete }
    }, { new: true });
    
    return res.status(200).json({
      status: 200,
      message: "isComplete updated successfully",
      data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating isComplete",
      error: error.message
    });
  }
});

export { getTodos, deleteTodo, addTodo,updateTodo,updatedIsComplete };
