import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import todoRouter from "./routers/todo.router.js"
dotenv.config()
const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes declaration
app.use("/api/todos", todoRouter)

// http://localhost:8000/api/todos

export { app }