import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { TODO } from "../models/todo.model.js";


// Get Todos
const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await TODO.find({});
    return res.status(200).json(new ApiResponse(200, todos));
  } catch (error) {
     throw new ApiError(400)
  }
});


export { getTodos};
