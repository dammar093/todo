import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { TODO } from "../models/todo.model.js";

// Add Todo
const addTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;
  if (!todo || todo.trim() === "") {
    throw new ApiError(400, "Todo is required!");
  }

  const response = await TODO.create({ todo });
  return res
    .status(201)
    .json(new ApiResponse(201, response, "Todo created successfully"));
});

// Get Todos
const getTodos = asyncHandler(async (req, res) => {
  const todos = await TODO.find({});
  return res.status(200).json(new ApiResponse(200, todos));
});

// Delete Todo
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await TODO.findByIdAndDelete(id);

  if (!data) {
    throw new ApiError(404, "Todo item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data._id, "Deleted successfully"));
});



// Update isComplete status
const updatedIsComplete = asyncHandler(async (req, res) => {
  const { isComplete, id } = req.body;

  if (typeof isComplete !== "boolean") {
    throw new ApiError(400, "isComplete must be a boolean");
  }

  const data = await TODO.findByIdAndUpdate(
    id,
    {
      $set: { isComplete },
    },
    { new: true }
  );

  if (!data) {
    throw new ApiError(404, "Todo item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "isComplete updated successfully"));
});

export { getTodos, deleteTodo, addTodo,  updatedIsComplete };
