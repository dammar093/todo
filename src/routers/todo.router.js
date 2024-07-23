import { Router } from "express"
import { getTodos,deleteTodo,addTodo, updatedIsComplete } from "../controllers/todo.controller.js"


const router = Router()

router.route("/").post(addTodo)
router.route("/").get(getTodos)
router.route("/:id").delete(deleteTodo)
// router.route("/").patch(updateTodo)
router.route("/updateIsComplete").patch(updatedIsComplete)
export default router