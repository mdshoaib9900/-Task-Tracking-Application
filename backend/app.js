const taskRoute=require("./src/routes/taskRoute");
const express=require("express");
require("dotenv").config();

const app=express();
app.use(express.json());

//all routes here
app.use("/api",taskRoute);



module.exports = app;