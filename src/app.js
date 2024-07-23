import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routers/todo.router.js";
import cors from 'cors'
import errorHandler from "./utils/errorHandler.js";

const app = express();


// Middleware for security headers
app.options('*', cors()); // Allow preflight requests for all routes

app.use(helmet());

// Middleware for logging
app.use(morgan('combined'));

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors());
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  
app.use(errorHandler)
// Use the router
app.use("/api/todos", router);

export default app
