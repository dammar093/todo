import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routers/todo.router.js";
import cors from 'cors'
import ApiError from "./utils/ApiError.js";

const app = express();


// Middleware for security headers
app.use(helmet());

// Middleware for logging
app.use(morgan('combined'));

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Use the router
app.use("/api/todos", router);

export default app
