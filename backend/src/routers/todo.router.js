import { Router } from "express"
import { getTodos,deleteTodo,addTodo, updateTodo } from "../controllers/todo.controller.js"


const router = Router()

router.route("/todos").post(addTodo)
router.route("/todos").get(getTodos)
router.route("/todos").delete(deleteTodo)
router.route("/todos").put(updateTodo)


export default router