import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routers/todo.router.js";
import cors from 'cors'
import errorHandler from "./utils/errorHandler.js";

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

// Centralized Error Handling Middleware
app.use(errorHandler);

// Export the app for serverless deployment
export default app
