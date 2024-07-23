const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const todoRouter = require("../src/router/todo");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve(__dirname, 'build')));

// Routes declaration
app.use("/api/todos", todoRouter);
// http://localhost:8000/api/todos

// Catch-all handler to serve index.html for any non-API routes

module.exports = app;
