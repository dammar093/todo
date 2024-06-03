import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))



//routes import

import todoRouter from "./routers/todo.router.js"

//routes declaration
app.use("/api", todoRouter)

// http://localhost:8000/api/todos

export { app }