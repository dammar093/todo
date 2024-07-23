const express = require("express");
const { getTodos,deleteTodo,addTodo, updateTodo,updatedIsComplete } = require("../controller/todo");


const router = express.Router()

router.route("/").post(addTodo)
router.route("/").get(getTodos)
router.route("/:id").delete(deleteTodo)
// router.route("/").patch(updateTodo)
router.route("/updateIsComplete").patch(updatedIsComplete)

module.exports=  router